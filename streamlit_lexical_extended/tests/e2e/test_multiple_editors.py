import subprocess
import sys
import time
from pathlib import Path

import pytest
import requests
from playwright.sync_api import Page, expect


TEST_PORT_MULTIPLE = 8504
TEST_URL_MULTIPLE = f"http://127.0.0.1:{TEST_PORT_MULTIPLE}"


def wait_for_server(url: str, timeout: float = 30.0) -> None:
    """Wait for server to be ready."""
    start = time.time()
    while time.time() - start < timeout:
        try:
            r = requests.get(url, timeout=1.0)
            if r.status_code < 500:
                return
        except Exception:
            pass
        time.sleep(0.25)
    raise RuntimeError(f"Server did not start at {url}")


@pytest.fixture(scope="module")
def multiple_editors_server():
    """Start the dedicated multiple-editors test app."""
    repo_root = Path(__file__).resolve().parents[3]
    test_app = (
        repo_root
        / "streamlit_lexical_extended"
        / "tests"
        / "e2e"
        / "multiple_editors_app.py"
    )
    
    cmd = [
        sys.executable,
        "-m",
        "streamlit",
        "run",
        str(test_app),
        "--server.headless",
        "true",
        "--server.port",
        str(TEST_PORT_MULTIPLE),
        "--server.address",
        "127.0.0.1",
    ]
    
    proc = subprocess.Popen(
        cmd,
        cwd=str(repo_root),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    
    try:
        wait_for_server(TEST_URL_MULTIPLE)
    except Exception:
        try:
            if proc.stdout:
                print(proc.stdout.read())
        finally:
            proc.kill()
        raise
    
    yield TEST_URL_MULTIPLE
    
    proc.terminate()
    try:
        proc.wait(timeout=5)
    except subprocess.TimeoutExpired:
        proc.kill()


@pytest.mark.e2e
def test_open_dialog_with_two_editors(page: Page, multiple_editors_server: str):
    """Test that dialog with two editors opens and both editors render."""
    page.goto(multiple_editors_server, timeout=60_000)
    
    # Wait for the main page
    expect(page.locator("text=Dialog with two editors")).to_be_visible(timeout=30_000)
    
    # Click the "Open dialog" button
    open_button = page.locator("button:has-text('Open dialog')")
    expect(open_button).to_be_visible()
    open_button.click()
    
    # Wait for dialog to open
    page.wait_for_timeout(1000)
    
    # Both editors should be visible
    editors = page.locator('[contenteditable="true"]')
    expect(editors).to_have_count(2, timeout=10_000)
    
    # Both should have their initial content
    editor_a = editors.nth(0)
    editor_b = editors.nth(1)
    
    expect(editor_a).to_contain_text("Editor 1")
    expect(editor_b).to_contain_text("Editor 2")


@pytest.mark.e2e
def test_editors_work_independently(page: Page, multiple_editors_server: str):
    """Test that typing in one editor doesn't affect the other."""
    page.goto(multiple_editors_server, timeout=60_000)
    
    # Open dialog
    page.locator("button:has-text('Open dialog')").click()
    page.wait_for_timeout(1000)
    
    editors = page.locator('[contenteditable="true"]')
    editor_a = editors.nth(0)
    editor_b = editors.nth(1)
    
    # Type in editor A
    editor_a.click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    text_a = "Text in Editor A only"
    page.keyboard.type(text_a)
    
    # Wait for debounce
    page.wait_for_timeout(800)
    
    # Editor A should have the text
    expect(editor_a).to_contain_text(text_a)
    
    # Editor B should NOT have this text
    editor_b_text = editor_b.text_content()
    assert text_a not in editor_b_text, "Text leaked to Editor B!"
    
    # Now type in editor B
    editor_b.click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    text_b = "Text in Editor B only"
    page.keyboard.type(text_b)
    
    # Wait for debounce
    page.wait_for_timeout(800)
    
    # Editor B should have its text
    expect(editor_b).to_contain_text(text_b)
    
    # Editor A should NOT have Editor B's text
    editor_a_text = editor_a.text_content()
    assert text_b not in editor_a_text, "Text leaked to Editor A!"
    
    # Both should have their respective content
    expect(editor_a).to_contain_text(text_a)
    expect(editor_b).to_contain_text(text_b)


@pytest.mark.e2e
def test_editors_maintain_state_after_close_reopen(page: Page, multiple_editors_server: str):
    """Test that editor content is preserved when closing and reopening dialog."""
    page.goto(multiple_editors_server, timeout=60_000)
    
    # Open dialog
    page.locator("button:has-text('Open dialog')").click()
    page.wait_for_timeout(1000)
    
    editors = page.locator('[contenteditable="true"]')
    editor_a = editors.nth(0)
    
    # Type in editor A
    editor_a.click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    test_text = "This should persist"
    page.keyboard.type(test_text)
    
    # Wait for save
    page.wait_for_timeout(1000)
    
    # Close dialog
    close_button = page.locator("button:has-text('Close')")
    if close_button.is_visible():
        close_button.click()
    else:
        # Try pressing Escape
        page.keyboard.press("Escape")
    
    page.wait_for_timeout(500)
    
    # Check that content is shown on main page
    expect(page.locator("text=This should persist")).to_be_visible(timeout=5_000)
    
    # Reopen dialog
    page.locator("button:has-text('Open dialog')").click()
    page.wait_for_timeout(1000)
    
    # Editor should still have the text
    editors = page.locator('[contenteditable="true"]')
    editor_a = editors.nth(0)
    expect(editor_a).to_contain_text(test_text, timeout=5_000)


@pytest.mark.e2e
def test_no_namespace_collision(page: Page, multiple_editors_server: str):
    """Test that editors have unique namespaces (no collision)."""
    page.goto(multiple_editors_server, timeout=60_000)
    
    # Open dialog
    page.locator("button:has-text('Open dialog')").click()
    page.wait_for_timeout(1000)
    
    # Check that editors have different keys/identifiers
    # This is verified by checking that both editors render independently
    editors = page.locator('[contenteditable="true"]')
    expect(editors).to_have_count(2)
    
    # Get the parent divs that should have unique keys
    editor_containers = page.locator('.streamlit-lexical-editor')
    expect(editor_containers).to_have_count(2)
    
    # Type simultaneously in both (alternate typing)
    editor_a = editors.nth(0)
    editor_b = editors.nth(1)
    
    editor_a.click()
    page.keyboard.type("A1")
    
    editor_b.click()
    page.keyboard.type("B1")
    
    editor_a.click()
    page.keyboard.type("A2")
    
    editor_b.click()
    page.keyboard.type("B2")
    
    page.wait_for_timeout(1000)
    
    # Each editor should have only its own text
    a_text = editor_a.text_content()
    b_text = editor_b.text_content()
    
    assert "A1" in a_text and "A2" in a_text
    assert "B1" in b_text and "B2" in b_text
    assert "B1" not in a_text and "B2" not in a_text
    assert "A1" not in b_text and "A2" not in b_text


@pytest.mark.e2e
def test_rapid_switching_between_editors(page: Page, multiple_editors_server: str):
    """Test rapid switching between editors doesn't cause state loss."""
    page.goto(multiple_editors_server, timeout=60_000)
    
    page.locator("button:has-text('Open dialog')").click()
    page.wait_for_timeout(1000)
    
    editors = page.locator('[contenteditable="true"]')
    editor_a = editors.nth(0)
    editor_b = editors.nth(1)
    
    # Rapidly switch and type
    for i in range(5):
        editor_a.click()
        page.keyboard.type(f"A{i}")
        page.wait_for_timeout(100)
        
        editor_b.click()
        page.keyboard.type(f"B{i}")
        page.wait_for_timeout(100)
    
    # Wait for all updates
    page.wait_for_timeout(1000)
    
    # Both editors should have all their respective content
    a_text = editor_a.text_content()
    b_text = editor_b.text_content()
    
    for i in range(5):
        assert f"A{i}" in a_text, f"A{i} missing from editor A"
        assert f"B{i}" in b_text, f"B{i} missing from editor B"


@pytest.mark.e2e
def test_formatting_independent_between_editors(page: Page, multiple_editors_server: str):
    """Test that formatting in one editor doesn't affect the other."""
    page.goto(multiple_editors_server, timeout=60_000)
    
    page.locator("button:has-text('Open dialog')").click()
    page.wait_for_timeout(1000)
    
    editors = page.locator('[contenteditable="true"]')
    editor_a = editors.nth(0)
    editor_b = editors.nth(1)
    
    # Make text bold in editor A
    editor_a.click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    page.keyboard.type("Bold in A")
    
    # Select text
    for _ in range(9):
        page.keyboard.press("Shift+ArrowLeft")
    
    # Make bold
    page.keyboard.press("Meta+B")
    page.wait_for_timeout(500)
    
    # Editor A should have bold element
    bold_in_a = editor_a.locator("strong")
    expect(bold_in_a).to_have_count(1, timeout=5_000)
    
    # Editor B should not have any bold elements yet
    bold_in_b = editor_b.locator("strong")
    expect(bold_in_b).to_have_count(0, timeout=2_000)
    
    # Type normal text in B
    editor_b.click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    page.keyboard.type("Normal in B")
    
    page.wait_for_timeout(500)
    
    # Editor B should still have no bold
    expect(bold_in_b).to_have_count(0)
    
    # Editor A should still have its bold
    expect(bold_in_a).to_have_count(1)

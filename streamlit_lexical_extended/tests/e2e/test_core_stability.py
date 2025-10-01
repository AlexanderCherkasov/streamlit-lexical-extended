"""
Core Playwright E2E tests for streamlit-lexical-extended v0.2.0 stability.

Critical tests to verify the main stability fixes work.
"""
import pytest
from playwright.sync_api import Page, expect


def get_editor_in_iframe(page: Page):
    """Helper to get editor inside Streamlit component iframe."""
    page.wait_for_timeout(2000)  # Wait for iframe to load
    frame = page.frame_locator("iframe").first
    editor = frame.locator('[contenteditable="true"]').first
    return editor


@pytest.mark.e2e
def test_component_renders(page: Page, server: str):
    """Test 1: Component renders successfully."""
    page.goto(server, timeout=60_000)
    expect(page.locator("text=Lexical Rich Text Editor")).to_be_visible(timeout=30_000)
    
    editor = get_editor_in_iframe(page)
    expect(editor).to_be_visible(timeout=10_000)
    expect(editor).not_to_be_empty()
    
    print("✅ Test 1 PASSED: Component renders")


@pytest.mark.e2e
def test_initial_value_returned(page: Page, server: str):
    """Test 2: Component returns initial value (not null)."""
    page.goto(server, timeout=60_000)
    expect(page.locator("text=Lexical Rich Text Editor")).to_be_visible(timeout=30_000)
    
    # Wait for component
    page.wait_for_timeout(3000)
    
    # Check that rendered markdown output exists (proves component returned value)
    # The example.py shows tables in the output
    tables = page.locator("table")
    table_count = tables.count()
    
    assert table_count >= 2, f"Expected at least 2 tables (editor + output), found {table_count}"
    print(f"✅ Test 2 PASSED: Found {table_count} tables - initial value was returned")


@pytest.mark.e2e
def test_text_doesnt_disappear(page: Page, server: str):
    """Test 3: Text doesn't disappear when typing."""
    page.goto(server, timeout=60_000)
    expect(page.locator("text=Lexical Rich Text Editor")).to_be_visible(timeout=30_000)
    
    editor = get_editor_in_iframe(page)
    expect(editor).to_be_visible(timeout=10_000)
    
    # Type text
    editor.click()
    test_text = "STABILITY_TEST_TEXT"
    page.keyboard.type(test_text)
    
    # Wait for debounce
    page.wait_for_timeout(1000)
    
    # Text should be visible
    expect(editor).to_contain_text(test_text, timeout=5_000)
    
    # Wait a bit more to ensure it doesn't disappear
    page.wait_for_timeout(1000)
    expect(editor).to_contain_text(test_text)
    
    print("✅ Test 3 PASSED: Text persists and doesn't disappear")


@pytest.mark.e2e
def test_no_js_errors(page: Page, server: str):
    """Test 4: No JavaScript errors on load."""
    console_errors = []
    
    def handle_console(msg):
        if msg.type == "error":
            console_errors.append(msg.text)
    
    page.on("console", handle_console)
    page.goto(server, timeout=60_000)
    
    editor = get_editor_in_iframe(page)
    expect(editor).to_be_visible(timeout=30_000)
    
    # Wait to catch any errors
    page.wait_for_timeout(2000)
    
    # Filter critical errors
    critical_errors = [
        err for err in console_errors 
        if "Lexical error" in err or "Cannot read" in err or "undefined is not" in err
    ]
    
    assert len(critical_errors) == 0, f"Found console errors: {critical_errors}"
    print(f"✅ Test 4 PASSED: No critical JS errors ({len(console_errors)} total console messages)")


@pytest.mark.e2e
def test_editor_maintains_focus(page: Page, server: str):
    """Test 5: Editor maintains focus during typing (no unmounting)."""
    page.goto(server, timeout=60_000)
    expect(page.locator("text=Lexical Rich Text Editor")).to_be_visible(timeout=30_000)
    
    editor = get_editor_in_iframe(page)
    expect(editor).to_be_visible(timeout=10_000)
    
    # Focus and type continuously
    editor.click()
    test_string = "ContinuousTypingTest"
    
    for char in test_string:
        page.keyboard.type(char)
        page.wait_for_timeout(50)
    
    # All text should be present
    expect(editor).to_contain_text(test_string, timeout=5_000)
    
    print("✅ Test 5 PASSED: Editor maintains focus during continuous typing")


@pytest.mark.e2e
def test_component_height(page: Page, server: str):
    """Test 6: Component respects height parameter."""
    page.goto(server, timeout=60_000)
    expect(page.locator("text=Lexical Rich Text Editor")).to_be_visible(timeout=30_000)
    
    page.wait_for_timeout(2000)
    frame = page.frame_locator("iframe").first
    editor_input = frame.locator('.editor-input').first
    
    expect(editor_input).to_be_visible(timeout=10_000)
    
    # Get height
    height = editor_input.evaluate("el => el.offsetHeight")
    
    # Should be around 960px (example.py default)
    assert 900 < height < 1020, f"Editor height {height}px not in expected range (900-1020)"
    print(f"✅ Test 6 PASSED: Height is {height}px (expected ~960px)")


@pytest.mark.e2e
def test_formatting_works(page: Page, server: str):
    """Test 7: Text formatting (bold) works."""
    page.goto(server, timeout=60_000)
    expect(page.locator("text=Lexical Rich Text Editor")).to_be_visible(timeout=30_000)
    
    editor = get_editor_in_iframe(page)
    expect(editor).to_be_visible(timeout=10_000)
    
    # Type and format text
    editor.click()
    page.keyboard.type("BoldTest")
    
    # Select text
    for _ in range(8):
        page.keyboard.press("Shift+ArrowLeft")
    
    # Make bold (Cmd+B on Mac)
    page.keyboard.press("Meta+B")
    page.wait_for_timeout(500)
    
    # Check for bold element
    bold = editor.locator("strong")
    bold_count = bold.count()
    
    # Should have at least 1 bold element
    assert bold_count > 0, "Bold formatting didn't work"
    print(f"✅ Test 7 PASSED: Bold formatting works ({bold_count} <strong> elements)")

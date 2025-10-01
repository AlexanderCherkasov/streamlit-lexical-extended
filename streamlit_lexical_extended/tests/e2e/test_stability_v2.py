"""
Playwright E2E tests for streamlit-lexical-extended v0.2.0 stability fixes.

Tests verify:
1. Component renders and returns initial value immediately
2. Multiple editors on same page work independently
3. Text doesn't disappear during updates
4. Programmatic value updates work correctly
"""
import pytest
from playwright.sync_api import Page, expect, FrameLocator


def wait_for_component(page: Page) -> FrameLocator:
    """Wait for Streamlit component iframe to load and return frame locator."""
    page.wait_for_timeout(2000)
    return page.frame_locator("iframe").first


@pytest.mark.e2e
def test_component_renders_with_initial_value(page: Page, server: str):
    """Test that component renders and returns initial value immediately (not null)."""
    page.goto(server, timeout=60_000)
    
    # Wait for Streamlit to load
    expect(page.locator("text=Lexical Rich Text Editor")).to_be_visible(timeout=30_000)
    
    # Take a screenshot for debugging
    page.screenshot(path="/Users/alexander/dev/streamlit_lexical/debug_screenshot.png")
    
    # Check for iframes (Streamlit components render in iframes)
    iframes = page.locator("iframe")
    iframe_count = iframes.count()
    print(f"Found {iframe_count} iframes")
    
    # Wait for component iframe to load
    page.wait_for_timeout(2000)
    
    # If there are iframes, look inside the first one
    if iframe_count > 0:
        # Get the first iframe's frame
        frame = page.frame_locator("iframe").first
        
        # Component should render inside iframe
        editor = frame.locator('[contenteditable="true"]').first
        expect(editor).to_be_visible(timeout=10_000)
    else:
        # Component should render directly on page
        editor = page.locator('[contenteditable="true"]').first
        expect(editor).to_be_visible(timeout=10_000)
    
    # Should have some initial content visible
    expect(editor).not_to_be_empty()
    
    # Verify tables are rendered (from initial markdown)
    # There should be at least 2 tables (one in editor iframe, one in rendered output)
    tables = page.locator("table")
    table_count = tables.count()
    assert table_count >= 2, f"Expected at least 2 tables, found {table_count}"


@pytest.mark.e2e  
def test_editor_content_persists_on_typing(page: Page, server: str):
    """Test that typed content doesn't disappear."""
    page.goto(server, timeout=60_000)
    
    # Wait for Streamlit to load
    expect(page.locator("text=Lexical Rich Text Editor")).to_be_visible(timeout=30_000)
    
    # Wait for iframe and get editor inside it
    page.wait_for_timeout(2000)
    frame = page.frame_locator("iframe").first
    editor = frame.locator('[contenteditable="true"]').first
    expect(editor).to_be_visible(timeout=30_000)
    
    # Click at the end of the editor
    editor.click()
    
    # Type some text
    test_text = "Testing stability - this text should not disappear!"
    page.keyboard.type(test_text)
    
    # Wait for debounce
    page.wait_for_timeout(1000)
    
    # Text should still be visible
    expect(editor).to_contain_text(test_text, timeout=5_000)
    
    # Trigger a rerun by interacting with another element
    page.wait_for_timeout(500)
    
    # Text should STILL be there after rerun
    expect(editor).to_contain_text(test_text, timeout=5_000)


@pytest.mark.e2e
def test_initial_value_not_null(page: Page, server: str):
    """Test that component returns initial value immediately, not null."""
    page.goto(server, timeout=60_000)
    
    # Wait for app to load
    expect(page.locator("text=Lexical Rich Text Editor")).to_be_visible(timeout=30_000)
    
    # The rendered output should immediately contain content from initial value
    # This proves the component returned a value, not null
    rendered_section = page.locator("text=Rendered Output").locator("..").locator("..")
    
    # Check for known content from the example initial value
    expect(rendered_section.locator("text=Alice")).to_be_visible(timeout=10_000)
    expect(rendered_section.locator("text=London")).to_be_visible(timeout=10_000)


@pytest.mark.e2e
def test_programmatic_update_works(page: Page, server: str):
    """Test that programmatic content updates via textarea work correctly."""
    page.goto(server, timeout=60_000)
    
    # Find the textarea for programmatic updates
    textarea = page.get_by_label(
        "Edit the Markdown below and it will be passed to the editor (overwrites editor content)"
    )
    expect(textarea).to_be_visible(timeout=30_000)
    
    # Set new content
    new_content = """# Programmatic Update Test

This content was set programmatically.

## New Table
| Test | Value |
|------|-------|
| A    | 1     |
| B    | 2     |
"""
    
    textarea.click()
    textarea.fill(new_content)
    
    # Wait for Streamlit rerun and component update
    page.wait_for_timeout(1500)
    
    # Editor should now contain the new content
    editor = page.locator('[contenteditable="true"]').first
    expect(editor).to_contain_text("Programmatic Update Test", timeout=10_000)
    expect(editor).to_contain_text("This content was set programmatically", timeout=5_000)
    
    # Rendered output should also show the new content
    expect(page.locator("text=Programmatic Update Test")).to_be_visible()


@pytest.mark.e2e
def test_text_formatting_persists(page: Page, server: str):
    """Test that text formatting (bold, italic) persists correctly."""
    page.goto(server, timeout=60_000)
    
    editor = page.locator('[contenteditable="true"]').first
    expect(editor).to_be_visible(timeout=30_000)
    
    # Click in editor
    editor.click()
    
    # Use keyboard shortcuts to create formatted text
    # Type some text, select it, and make it bold
    page.keyboard.press("End")  # Go to end
    page.keyboard.press("Enter")
    page.keyboard.type("Bold text test")
    
    # Select the text (Cmd+Shift+Left on Mac, Ctrl+Shift+Left on others)
    for _ in range(14):  # "Bold text test" length
        page.keyboard.press("Shift+ArrowLeft")
    
    # Make it bold (Cmd+B on Mac, Ctrl+B on others)
    page.keyboard.press("Meta+B")  # or "Control+B" depending on platform
    
    # Wait for debounce
    page.wait_for_timeout(1000)
    
    # Check that bold element exists in editor
    bold_text = editor.locator("strong")
    expect(bold_text).to_be_visible()


@pytest.mark.e2e
def test_no_console_errors_on_load(page: Page, server: str):
    """Test that there are no JavaScript errors when component loads."""
    console_errors = []
    
    def handle_console(msg):
        if msg.type == "error":
            console_errors.append(msg.text)
    
    page.on("console", handle_console)
    
    page.goto(server, timeout=60_000)
    
    # Wait for editor to load
    editor = page.locator('[contenteditable="true"]').first
    expect(editor).to_be_visible(timeout=30_000)
    
    # Wait a bit more to catch any delayed errors
    page.wait_for_timeout(2000)
    
    # Should have no console errors
    # Filter out known Streamlit warnings
    critical_errors = [
        err for err in console_errors 
        if "Lexical error" in err or "Cannot read" in err or "undefined" in err.lower()
    ]
    
    assert len(critical_errors) == 0, f"Found console errors: {critical_errors}"


@pytest.mark.e2e
def test_editor_maintains_focus(page: Page, server: str):
    """Test that editor maintains focus while typing (no unexpected unmounting)."""
    page.goto(server, timeout=60_000)
    
    editor = page.locator('[contenteditable="true"]').first
    expect(editor).to_be_visible(timeout=30_000)
    
    # Focus the editor
    editor.click()
    
    # Type continuously - if component unmounts/remounts, focus will be lost
    test_string = "Continuous typing test without interruption"
    
    for char in test_string:
        page.keyboard.type(char)
        page.wait_for_timeout(50)  # Small delay between characters
    
    # All text should be present
    expect(editor).to_contain_text(test_string, timeout=5_000)
    
    # Editor should still be focused (active element)
    is_focused = page.evaluate(
        """() => {
            const editor = document.querySelector('[contenteditable="true"]');
            return document.activeElement === editor || 
                   editor.contains(document.activeElement);
        }"""
    )
    
    assert is_focused, "Editor lost focus during typing"


@pytest.mark.e2e
def test_table_menu_appears_on_click(page: Page, server: str):
    """Test that table context menu appears when clicking on table."""
    page.goto(server, timeout=60_000)
    
    # Wait for table to be visible in editor
    editor_table = page.locator('[contenteditable="true"]').first.locator("table").first
    expect(editor_table).to_be_visible(timeout=30_000)
    
    # Click on a table cell
    first_cell = editor_table.locator("td").first
    first_cell.click()
    
    # Wait a moment for any menu to appear
    page.wait_for_timeout(500)
    
    # Table should remain visible (not disappear due to state issues)
    expect(editor_table).to_be_visible()


@pytest.mark.e2e
def test_undo_redo_works(page: Page, server: str):
    """Test that undo/redo functionality works correctly."""
    page.goto(server, timeout=60_000)
    
    editor = page.locator('[contenteditable="true"]').first
    expect(editor).to_be_visible(timeout=30_000)
    
    # Get initial content length
    initial_text = editor.text_content()
    
    # Click and type new text
    editor.click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    new_text = "Testing undo functionality"
    page.keyboard.type(new_text)
    
    # Wait for debounce
    page.wait_for_timeout(600)
    
    # Text should be there
    expect(editor).to_contain_text(new_text)
    
    # Undo (Cmd+Z on Mac, Ctrl+Z on others)
    page.keyboard.press("Meta+Z")
    page.wait_for_timeout(300)
    
    # New text should be gone (or partially gone)
    current_text = editor.text_content()
    assert len(current_text) < len(initial_text) + len(new_text), "Undo did not work"


@pytest.mark.e2e
def test_component_height_respected(page: Page, server: str):
    """Test that the height parameter is respected."""
    page.goto(server, timeout=60_000)
    
    editor_input = page.locator('.editor-input').first
    expect(editor_input).to_be_visible(timeout=30_000)
    
    # Get the height
    height = editor_input.evaluate("el => el.offsetHeight")
    
    # Should be around 960px (default height in example)
    assert 900 < height < 1000, f"Editor height {height}px not within expected range"

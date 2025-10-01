from playwright.sync_api import Page, expect
import pytest


@pytest.mark.e2e
def test_initial_table_renders_in_editor_and_output(page: Page, server: str):
    # Open Streamlit example app
    page.goto(server, timeout=60_000)

    # Wait for the app header
    expect(page.locator("text=Lexical Rich Text Editor")).to_be_visible()

    # There should be at least one <table> in the editor and one in the rendered output
    # The simplest robust assertion: at least 2 tables on the page
    page.wait_for_selector("table", timeout=30_000)
    tables = page.locator("table")
    expect(tables).to_have_count(2)

    # Verify some cells from the example exist in the DOM
    expect(page.locator("text=Alice")).to_be_visible()
    expect(page.locator("text=London")).to_be_visible()


@pytest.mark.e2e
def test_plaintext_change_updates_editor_and_output(page: Page, server: str):
    page.goto(server, timeout=60_000)

    # Replace the plain text input with a new table
    new_md = (
        "| Product | Qty | Price |\n"
        "| --- | ---: | ---: |\n"
        "| Pen | 2 | 1.5 |\n"
        "| Notebook | 1 | 4.0 |\n"
    )

    # Find the text area via its label text
    textarea = page.get_by_label(
        "Edit the Markdown below and it will be passed to the editor (overwrites editor content)"
    )
    textarea.click()
    textarea.fill(new_md)

    # Streamlit should rerun; wait for the new cell text to appear
    page.wait_for_timeout(500)  # give Streamlit a moment to rerun
    expect(page.locator("text=Product")).to_be_visible()
    expect(page.locator("text=Notebook")).to_be_visible()

    # There should still be at least 2 tables (editor + rendered output)
    tables = page.locator("table")
    expect(tables).to_have_count(2)

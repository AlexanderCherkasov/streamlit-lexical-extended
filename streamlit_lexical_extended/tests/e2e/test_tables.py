import pytest
from playwright.sync_api import Page, expect


@pytest.mark.e2e
def test_table_markdown_round_trip_and_row_column_actions(page: Page, server: str):
    page.goto(server, timeout=60_000)
    editor = page.locator('[contenteditable="true"]').first
    table = editor.locator("table")
    expect(table).to_be_visible(timeout=30_000)
    expect(table.locator("tr")).to_have_count(3)
    expect(page.locator('[data-testid="stText"]').first).to_contain_text(
        "| Product | Owner | Status |"
    )

    table.locator("td").first.click()
    chevron = page.locator(".table-cell-chevron")
    expect(chevron).to_be_visible()
    chevron.click()
    menu = page.locator(".table-context-menu")
    expect(menu).to_be_visible()

    row_section = menu.locator(".menu-section").filter(has_text="Row")
    row_section.get_by_role("button", name="+Below", exact=True).click()
    expect(table.locator("tr")).to_have_count(4)

    table.locator("td").first.click()
    page.locator(".table-cell-chevron").click()
    column_section = page.locator(".menu-section").filter(has_text="Column")
    column_section.get_by_role("button", name="+Right", exact=True).click()
    expect(table.locator("tr").first.locator("th, td")).to_have_count(4)

    table.locator("td").first.click()
    page.locator(".table-cell-chevron").click()
    row_section = page.locator(".menu-section").filter(has_text="Row")
    row_section.get_by_role("button", name="Delete").click()
    expect(table.locator("tr")).to_have_count(3)


@pytest.mark.e2e
def test_insert_table_toolbar(page: Page, server: str):
    page.goto(server, timeout=60_000)
    editor = page.locator('[contenteditable="true"]').first
    expect(editor).to_be_visible(timeout=30_000)
    expect(editor.locator("table")).to_have_count(1)
    initial_count = editor.locator("table").count()

    editor.click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    page.get_by_role("button", name="Insert Table").first.click()
    page.locator('.table-insert-cell[title="2 x 2"]').click()

    expect(editor.locator("table")).to_have_count(initial_count + 1)

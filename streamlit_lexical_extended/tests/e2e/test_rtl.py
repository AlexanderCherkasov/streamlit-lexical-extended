import re

import pytest
from playwright.sync_api import Page, expect


@pytest.mark.e2e
def test_component_inherits_parent_rtl_layout(page: Page, rtl_server: str):
    browser_errors: list[str] = []
    page.on("pageerror", lambda error: browser_errors.append(str(error)))
    page.on(
        "console",
        lambda message: browser_errors.append(message.text)
        if message.type == "error"
        else None,
    )

    page.goto(rtl_server, timeout=60_000)
    page.get_by_role("tab", name="RTL editor", exact=True).click()
    editor = page.locator('[contenteditable="true"]').first
    expect(editor).to_be_visible(timeout=30_000)

    body_direction = page.evaluate(
        "() => getComputedStyle(document.body).direction"
    )
    editor_styles = editor.evaluate(
        """node => {
            const styles = getComputedStyle(node);
            const hostStyles = getComputedStyle(node.getRootNode().host);
            return {
                direction: styles.direction,
                hostDirection: hostStyles.direction,
                textAlign: styles.textAlign,
                unicodeBidi: styles.unicodeBidi,
            };
        }"""
    )

    assert body_direction == "rtl"
    assert editor_styles["hostDirection"] == "rtl"
    assert editor_styles["direction"] == "rtl"
    assert editor_styles["textAlign"] in {"right", "start"}
    assert editor_styles["unicodeBidi"] == "plaintext"

    undo_box = page.get_by_role("button", name="Undo").bounding_box()
    table_box = page.get_by_role("button", name="Insert Table").bounding_box()
    assert undo_box is not None and table_box is not None
    assert undo_box["x"] > table_box["x"]

    unordered_list = editor.locator("ul").first
    list_padding = unordered_list.evaluate(
        """node => {
            const styles = getComputedStyle(node);
            return {
                left: parseFloat(styles.paddingLeft),
                right: parseFloat(styles.paddingRight),
            };
        }"""
    )
    assert list_padding["right"] >= 20
    assert list_padding["left"] == 0

    quote = editor.locator("blockquote")
    quote_borders = quote.evaluate(
        """node => {
            const styles = getComputedStyle(node);
            return {
                left: parseFloat(styles.borderLeftWidth),
                right: parseFloat(styles.borderRightWidth),
            };
        }"""
    )
    assert quote_borders["right"] >= 4
    assert quote_borders["left"] == 0

    first_cell = editor.locator("td").first
    cell_styles = first_cell.evaluate(
        """node => {
            const styles = getComputedStyle(node);
            return {
                direction: styles.direction,
                textAlign: styles.textAlign,
            };
        }"""
    )
    assert cell_styles["direction"] == "rtl"
    assert cell_styles["textAlign"] in {"right", "start"}

    first_cell.click()
    chevron = page.locator(".table-cell-chevron")
    expect(chevron).to_be_visible()
    cell_box = first_cell.bounding_box()
    chevron_box = chevron.bounding_box()
    assert cell_box is not None and chevron_box is not None
    assert chevron_box["x"] < cell_box["x"] + cell_box["width"] / 2

    chevron.click()
    menu = page.locator(".table-context-menu")
    expect(menu).to_be_visible()
    assert menu.evaluate("node => getComputedStyle(node).direction") == "rtl"
    column_buttons = menu.locator(".menu-section").filter(has_text="Column")
    expect(column_buttons.locator("button").first).to_have_text("+Right")

    page.keyboard.press("Escape")
    p = editor.locator("p").first
    p.click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    page.keyboard.type("עדכון חדש")

    expect(editor).to_contain_text("עדכון חדש", timeout=5_000)

    output = page.get_by_role(
        "textbox",
        name="RTL Markdown output",
        exact=True,
    )
    expect(output).to_have_value(re.compile("עדכון חדש"), timeout=10_000)

    assert not browser_errors

import pytest
from playwright.sync_api import Page, expect

from streamlit_lexical_extended.demo_content import FULL_FORMATTING_MARKDOWN


def _assert_full_formatting(editor) -> None:
    expect(editor.locator("h1")).to_have_count(1)
    expect(editor.locator("h2")).to_have_count(1)
    expect(editor.locator("h3")).to_have_count(4)
    expect(editor.locator("h4")).to_have_count(1)
    expect(editor.locator("h5")).to_have_count(1)
    expect(editor.locator("h6")).to_have_count(1)
    expect(editor.locator("strong")).not_to_have_count(0)
    expect(editor.locator("em")).not_to_have_count(0)
    expect(editor.locator(".editor-text-strikethrough")).not_to_have_count(0)
    expect(editor.locator(".editor-text-code")).to_contain_text("inline code")
    expect(editor.locator("blockquote")).to_have_count(1)
    expect(editor.locator("ul")).to_have_count(1)
    expect(editor.locator("ol")).to_have_count(1)
    expect(editor.locator("code.editor-code")).to_contain_text(
        'return f"Hello, {name}!"'
    )
    expect(editor.locator("table")).to_have_count(1)
    expect(editor.locator("table tr")).to_have_count(4)


def _assert_api_round_trip(
    page: Page,
    example_server: str,
    *,
    external_title: str,
    marker: str,
) -> None:
    browser_errors: list[str] = []
    page.on("pageerror", lambda error: browser_errors.append(str(error)))
    page.on(
        "console",
        lambda message: browser_errors.append(message.text)
        if message.type == "error"
        else None,
    )

    page.goto(example_server, timeout=60_000)
    source = page.get_by_role("textbox", name="Input Markdown", exact=True)
    output = page.get_by_role("textbox", name="Output Markdown", exact=True)
    editor = page.locator('[contenteditable="true"]').first

    expect(editor).to_be_visible(timeout=30_000)
    expect(source).to_have_value(FULL_FORMATTING_MARKDOWN)
    _assert_full_formatting(editor)

    external_markdown = FULL_FORMATTING_MARKDOWN.strip().replace(
        "Complete Markdown Round Trip",
        external_title,
        1,
    )
    source.fill(external_markdown)
    source.press("Control+Enter")

    expect(editor.locator("h1")).to_have_text(external_title, timeout=10_000)
    expect(output).to_have_value(external_markdown, timeout=10_000)
    _assert_full_formatting(editor)

    editor.locator("h6").click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    page.keyboard.press("Enter")
    page.keyboard.type(marker)

    expected_markdown = f"{external_markdown}\n\n{marker}"
    expect(output).to_have_value(expected_markdown, timeout=10_000)
    expect(source).to_have_value(expected_markdown, timeout=10_000)
    _assert_full_formatting(editor)

    assert not [
        error
        for error in browser_errors
        if "insertBefore" in error or "NotFoundError" in error
    ]
    expect(page.get_by_text("NotFoundError")).to_have_count(0)


@pytest.mark.e2e
def test_full_markdown_input_output_round_trip(
    page: Page,
    example_server: str,
):
    _assert_api_round_trip(
        page,
        example_server,
        external_title="ComponentResult API Round Trip",
        marker="Editor output marker",
    )

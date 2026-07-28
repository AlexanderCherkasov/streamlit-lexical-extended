import pytest
from playwright.sync_api import Page, expect


def editor(page: Page, index: int = 0):
    return page.locator('[contenteditable="true"]').nth(index)


@pytest.mark.e2e
def test_initial_markdown_renders_directly_without_iframe(page: Page, server: str):
    page.goto(server, timeout=60_000)
    expect(page.get_by_text("Streamlit Lexical v2 E2E")).to_be_visible(
        timeout=30_000
    )

    expect(page.locator("iframe")).to_have_count(0)
    expect(editor(page)).to_be_visible()
    expect(editor(page)).to_contain_text("Product Notes")
    expect(editor(page).locator("table")).to_have_count(1)
    expect(editor(page).locator("code")).to_contain_text('print("round trip")')
    expect(page.locator(".streamlit-lexical-react-root")).to_have_count(4)


@pytest.mark.e2e
def test_debounce_callback_and_focus_survive_rerun(page: Page, server: str):
    console_errors = []
    page.on(
        "console",
        lambda message: console_errors.append(message.text)
        if message.type == "error"
        else None,
    )
    page.goto(server, timeout=60_000)

    main = editor(page)
    expect(main).to_be_visible(timeout=30_000)
    main.click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    page.keyboard.type("Typed update")

    expect(page.get_by_text("Callback count: 1")).to_be_visible(timeout=10_000)
    expect(main).to_contain_text("Typed update")
    expect(page.locator('[data-testid="stText"]').first).to_contain_text(
        "Typed update"
    )
    assert main.evaluate("node => node.getRootNode().activeElement === node")
    assert not [
        error
        for error in console_errors
        if "Lexical error" in error or "Cannot read" in error
    ]


@pytest.mark.e2e
def test_external_update_and_clear(page: Page, server: str):
    page.goto(server, timeout=60_000)
    main = editor(page)
    expect(main).to_be_visible(timeout=30_000)

    page.get_by_role("button", name="Load external update").click()
    expect(main).to_contain_text("External Update")

    page.get_by_role("button", name="Clear editor").click()
    expect(main).to_have_text("")


@pytest.mark.e2e
def test_fixed_and_content_height(page: Page, server: str):
    page.goto(server, timeout=60_000)
    fixed = page.locator(".streamlit-lexical-editor").filter(
        has_text="Product Notes"
    )
    automatic = page.locator(".streamlit-lexical-editor").filter(
        has_text="Native v2 value"
    )
    expect(fixed).to_be_visible(timeout=30_000)

    fixed_height = fixed.evaluate("node => node.getBoundingClientRect().height")
    auto_height = automatic.evaluate("node => node.getBoundingClientRect().height")
    assert 390 <= fixed_height <= 430
    assert auto_height >= 180
    assert auto_height < fixed_height


@pytest.mark.e2e
def test_toolbar_formatting_lists_quotes_and_undo(page: Page, server: str):
    page.goto(server, timeout=60_000)
    main = editor(page)
    expect(main).to_be_visible(timeout=30_000)

    main.click()
    page.keyboard.press("End")
    page.keyboard.press("Enter")
    page.keyboard.type("Formatting")
    for _ in "Formatting":
        page.keyboard.press("Shift+ArrowLeft")
    page.get_by_role("button", name="Format Bold").first.click()
    expect(main.locator("strong").filter(has_text="Formatting")).to_be_visible()

    page.get_by_role("button", name="Quote").first.click()
    expect(main.locator("blockquote")).to_be_visible()
    page.get_by_role("button", name="Bullet List").first.click()
    expect(main.locator("ul")).to_have_count(2)

    page.get_by_role("button", name="Undo").first.click()
    page.get_by_role("button", name="Redo").first.click()
    expect(main).to_contain_text("Formatting")


@pytest.mark.e2e
def test_streamlit_light_and_dark_theme_variables(page: Page, server: str):
    console_errors = []
    page.on(
        "console",
        lambda message: console_errors.append(message.text)
        if message.type == "error"
        else None,
    )
    page.emulate_media(color_scheme="light")
    page.goto(server, timeout=60_000)
    container = page.locator(".editor-container").first
    expect(container).to_be_visible(timeout=30_000)

    light = container.evaluate(
        """node => ({
            background: getComputedStyle(node).backgroundColor,
            foreground: getComputedStyle(node).color,
            variable: getComputedStyle(node)
                .getPropertyValue("--st-background-color"),
        })"""
    )
    page.emulate_media(color_scheme="dark")
    page.wait_for_timeout(300)
    dark = container.evaluate(
        """node => ({
            background: getComputedStyle(node).backgroundColor,
            foreground: getComputedStyle(node).color,
            variable: getComputedStyle(node)
                .getPropertyValue("--st-background-color"),
        })"""
    )

    assert light["variable"]
    assert dark["variable"]
    assert light["background"] != dark["background"]
    assert light["foreground"] != dark["foreground"]
    assert not console_errors

# streamlit-lexical-extended

[![PyPI](https://img.shields.io/pypi/v/streamlit-lexical-extended)](https://pypi.org/project/streamlit-lexical-extended/)
[![Python](https://img.shields.io/pypi/pyversions/streamlit-lexical-extended)](https://pypi.org/project/streamlit-lexical-extended/)
[![CI](https://github.com/AlexanderCherkasov/streamlit-lexical-extended-/actions/workflows/ci.yml/badge.svg)](https://github.com/AlexanderCherkasov/streamlit-lexical-extended-/actions/workflows/ci.yml)

A rich-text Markdown editor for Streamlit, powered by
[Lexical](https://lexical.dev/). It supports formatting, lists, quotes, code
blocks, tables, undo/redo, programmatic updates, and multiple independent
editors. Markdown output uses hard-break markers for consecutive plain-text
lines, so line breaks remain visible when rendered with `st.markdown`.

Version 0.3 uses package-based Streamlit Custom Components v2. The editor
renders directly in Streamlit's DOM without an iframe.

## Requirements

- Python 3.10+
- Streamlit 1.51+
- Node.js 24+ for development

## Installation

```bash
pip install streamlit-lexical-extended
```

## Quick start

The component natively returns a Markdown string (`str`). When `key` is set,
Streamlit stores the string in `st.session_state[key]`.

```python
import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended


def editor_changed() -> None:
    markdown = st.session_state["editor"]
    st.toast(f"Document updated: {len(markdown)} characters")


markdown_text = streamlit_lexical_extended(
    value="# Hello",
    key="editor",
    height=360,
    on_change=editor_changed,
)

st.markdown(markdown_text)
st.code(st.session_state["editor"], language="markdown")
```

The function accepts `value`, `placeholder`, `height`, `min_height`,
`debounce`, `key`, `on_change`, `width`, and `toolbar`.

- `value=None` leaves the current editor content untouched; `value=""` clears
  it. Any other string replaces the current document.
- `height=int` uses a fixed height with internal scrolling. `height=None`
  grows with content and respects `min_height`.
- `width` accepts `"stretch"`, `"content"`, or a positive pixel integer.
- `on_change` receives no arguments.

### Toolbar configuration

By default, `toolbar=None` displays every tool. Pass a list to display only
the controls needed by a particular editor:

```python
result = streamlit_lexical_extended(
    value="# Compact editor",
    key="compact_editor",
    toolbar=["undo", "redo", "block_type", "bold", "italic"],
)
```

An empty list hides the toolbar:

```python
result = streamlit_lexical_extended(
    value="Keyboard-first editor",
    toolbar=[],
)
```

Available tool names:

| Tool | Control |
| --- | --- |
| `undo`, `redo` | History |
| `block_type` | Paragraph and heading selector |
| `bold`, `italic`, `underline`, `strikethrough` | Inline formatting |
| `quote` | Block quote |
| `bullet_list`, `numbered_list` | Lists |
| `table` | Table insertion |

Selected controls retain the editor's standard toolbar order.

### Right-to-left applications

The editor automatically reads the computed `direction` of its Components v2
Shadow host. No component argument is required. Parent application styles such
as the following switch the editor, toolbar, lists, quotes, tables, and table
menus to RTL:

```python
st.markdown(
    """
<style>
body, html {
    direction: RTL;
    unicode-bidi: bidi-override;
    text-align: right;
}
p, div, input, label, h1, h2, h3, h4, h5, h6 {
    direction: RTL;
    unicode-bidi: bidi-override;
    text-align: right;
}
</style>
""",
    unsafe_allow_html=True,
)
```

Use a unique `key` for each editor:

```python
st.session_state["editor"]  # Markdown string
```


## Development

Install [uv](https://docs.astral.sh/uv/getting-started/installation/) and
Node.js 24, then run:

```bash
uv sync --extra dev
npm install --prefix streamlit_lexical_extended/frontend
npm run build --prefix streamlit_lexical_extended/frontend
uv run streamlit run streamlit_lexical_extended/example.py
```

For a clean, lockfile-based frontend install use `npm ci`. Frontend watch mode
uses stable development asset names:

```bash
npm run dev --prefix streamlit_lexical_extended/frontend
```

Refresh the Streamlit page after a successful rebuild.

### VS Code

Open the repository and select `Streamlit: run example` in **Run and Debug**.
It creates/synchronizes `.venv`, installs frontend dependencies, builds the
component, starts Streamlit, and opens the app.

Use `Streamlit: develop frontend` for frontend watch mode. `Cmd/Ctrl+Shift+B`
runs the default quick verification. Additional tasks cover unit tests, E2E
tests, package building, and package metadata checks.

## Tests

```bash
uv run pytest tests -q
uv run playwright install chromium
uv run pytest streamlit_lexical_extended/tests/e2e -q
```

The E2E suite covers direct-DOM rendering, callbacks, focus, external updates,
multiple editors, dimensions, formatting, themes, tables, and Markdown
round-trips.

## Publishing

1. Update the version in the root `pyproject.toml`, component `pyproject.toml`,
   and frontend `package.json`, then update `CHANGELOG.md`.
2. Run the VS Code tasks `Project: verify`, `Tests: e2e`, and `Package: check`.
3. Configure a PyPI Trusted Publisher for this repository, workflow
   `publish.yml`, and environment `pypi`.
4. Create and publish a GitHub release whose tag matches the version, such as
   `v0.3.0`.

The release workflow builds the frontend and Python distributions, validates
the metadata, and publishes to PyPI using short-lived OIDC credentials.

See
[CONTRIBUTING.md](https://github.com/AlexanderCherkasov/streamlit-lexical-extended-/blob/main/CONTRIBUTING.md)
for contributor setup and
[CHANGELOG.md](https://github.com/AlexanderCherkasov/streamlit-lexical-extended-/blob/main/CHANGELOG.md)
for release history.

## License

MIT

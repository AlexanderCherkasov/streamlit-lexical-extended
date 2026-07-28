# streamlit-lexical-extended

[![PyPI](https://img.shields.io/pypi/v/streamlit-lexical-extended)](https://pypi.org/project/streamlit-lexical-extended/)
[![Python](https://img.shields.io/pypi/pyversions/streamlit-lexical-extended)](https://pypi.org/project/streamlit-lexical-extended/)
[![CI](https://github.com/AlexanderCherkasov/streamlit-lexical-extended-/actions/workflows/ci.yml/badge.svg)](https://github.com/AlexanderCherkasov/streamlit-lexical-extended-/actions/workflows/ci.yml)

A rich-text Markdown editor for Streamlit, powered by
[Lexical](https://lexical.dev/). It supports formatting, lists, quotes, code
blocks, tables, undo/redo, programmatic updates, and multiple independent
editors.

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

The component returns a native Components v2 `ComponentResult`. Markdown is
available as `result.value`. When `key` is set, Streamlit stores the same
result object in `st.session_state[key]` before `on_change` runs.

```python
import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended


def editor_changed() -> None:
    markdown = st.session_state["editor"].value
    st.toast(f"Document updated: {len(markdown)} characters")


result = streamlit_lexical_extended(
    value="# Hello",
    key="editor",
    height=360,
    on_change=editor_changed,
)

st.markdown(result.value)
st.code(st.session_state["editor"].value, language="markdown")
```

The function accepts `value`, `placeholder`, `height`, `min_height`,
`debounce`, `key`, `on_change`, and `width`.

- `value=None` leaves the current editor content untouched; `value=""` clears
  it. Any other string replaces the current document.
- `height=int` uses a fixed height with internal scrolling. `height=None`
  grows with content and respects `min_height`.
- `width` accepts `"stretch"`, `"content"`, or a positive pixel integer.
- `on_change` receives no arguments.

Use a unique `key` for each editor:

```python
st.session_state["editor"].value  # Markdown string
```

### Migrating from 0.2

Version 0.3 has one intentionally breaking API:

- `streamlit_lexical_extended()` now returns `ComponentResult`; read Markdown
  from `result.value`.
- `st.session_state[key]` contains that result object, so callbacks read
  `st.session_state[key].value`.
- The compatibility wrapper, `_v2` alias, and `overwrite` option were removed.

Run the complete example:

```bash
streamlit run streamlit_lexical_extended/example.py
```

The example sends full-formatting Markdown into Lexical and displays the
serialized `result.value` output for an end-to-end round-trip check.

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

# Contributing

Thank you for improving `streamlit-lexical-extended`.

## Setup

Requirements: Python 3.10+, Node.js 24+, and
[uv](https://docs.astral.sh/uv/).

```bash
uv sync --extra dev
npm ci --prefix streamlit_lexical_extended/frontend
```

VS Code users can run `Project: prepare` or start
`Streamlit: run example`; both perform the required setup automatically.

## Development checks

```bash
npm run typecheck --prefix streamlit_lexical_extended/frontend
npm run build --prefix streamlit_lexical_extended/frontend
uv run pytest tests -q
uv run playwright install chromium
uv run pytest streamlit_lexical_extended/tests/e2e -q
```

Commit updated production files from
`streamlit_lexical_extended/frontend/build` whenever frontend source changes.
Do not commit virtual environments, dependency directories, test reports,
screenshots, distributions, or credentials.

## Pull requests

Keep changes focused, add or update tests for behavior changes, and document
public API changes in both `README.md` and `CHANGELOG.md`.

# Building and publishing

This project publishes one Python wheel and one source distribution. The
frontend is built first and its hashed assets are included in the Python
package.

## Prerequisites

- Python 3.10 or newer
- Node.js 24 or newer
- `uv` (recommended) or Python `venv`/`pip`
- A PyPI account with permission to publish `streamlit-lexical-extended`

## Local build

Run these commands from the repository root:

```bash
uv sync --extra dev
npm ci --prefix streamlit_lexical_extended/frontend
npm run build --prefix streamlit_lexical_extended/frontend
uv run python -m build
uv run twine check dist/*
```

The distributions are written to `dist/`:

```text
dist/streamlit_lexical_extended-<version>-py3-none-any.whl
dist/streamlit_lexical_extended-<version>.tar.gz
```

To test the built wheel locally:

```bash
python -m venv /tmp/lexical-release-check
/tmp/lexical-release-check/bin/python -m pip install --upgrade pip
/tmp/lexical-release-check/bin/python -m pip install dist/*.whl
/tmp/lexical-release-check/bin/python -c \
  "from streamlit_lexical_extended import streamlit_lexical_extended; print('import ok')"
```

Do not build with stale assets. If the frontend source changed, always run
`npm run build` before `python -m build`. The package loader requires exactly
one `index-*.js` and one `styles-*.css` file in
`streamlit_lexical_extended/frontend/build`.

## Versioning

Before a release, set the same version in all four files:

1. `pyproject.toml` (`[project].version`)
2. `streamlit_lexical_extended/pyproject.toml`
3. `streamlit_lexical_extended/frontend/package.json`
4. `streamlit_lexical_extended/frontend/package-lock.json`

Add a matching entry to `CHANGELOG.md`, then run:

```bash
uv run pytest tests -q
npm run check --prefix streamlit_lexical_extended/frontend
uv run python -m build
uv run twine check dist/*
```

The release tag must be `v<version>`, for example `v0.3.0`.

## Recommended: GitHub Trusted Publishing

The repository contains `.github/workflows/publish.yml`. Configure PyPI once:

1. On PyPI, open **Publishing** for the project and add a GitHub publisher.
2. Set the owner to `AlexanderCherkasov`, repository to
   `streamlit-lexical-extended-`, workflow to `publish.yml`, and environment
   to `pypi`.
3. In GitHub repository settings, create the environment named `pypi`.
4. Push the version and changelog commit, then create a GitHub release with a
   tag matching the version, such as `v0.3.0`.

Publishing starts automatically after the release is marked **Published**.
The workflow verifies the tag, rebuilds the frontend, runs `twine check`, and
uploads both distributions using short-lived OIDC credentials. No PyPI token
is stored in GitHub secrets.

## Manual upload with a PyPI token

Use this only when Trusted Publishing is unavailable. Create a project token
in PyPI, then upload a freshly built `dist/` directory:

```bash
export TWINE_USERNAME=__token__
export TWINE_PASSWORD='pypi-...'
uv run twine upload dist/*
```

For a safe pre-release check, upload to TestPyPI first:

```bash
export TWINE_USERNAME=__token__
export TWINE_PASSWORD='pypi-...'
uv run twine upload --repository testpypi dist/*
python -m pip install --index-url https://test.pypi.org/simple/ \
  --extra-index-url https://pypi.org/simple \
  streamlit-lexical-extended==<version>
```

Never commit tokens or put them directly in shell history when possible. A
keyring-backed Twine configuration or an interactive prompt is safer.

## Verify the published package

After publishing, install the exact version in a clean environment and run a
minimal Streamlit app:

```bash
python -m venv /tmp/lexical-pypi-check
/tmp/lexical-pypi-check/bin/python -m pip install \
  streamlit-lexical-extended==<version>
/tmp/lexical-pypi-check/bin/python -c \
  "import streamlit_lexical_extended; print('package ok')"
```

Then start the example from a checkout or copy the component call into a
small Streamlit app and confirm the editor renders, accepts input, and returns
Markdown through `result.value`.

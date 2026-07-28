import json
import tomllib
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "streamlit_lexical_extended" / "frontend"


def _toml(path: Path) -> dict:
    with path.open("rb") as handle:
        return tomllib.load(handle)


def test_release_versions_are_aligned():
    versions = {
        _toml(ROOT / "pyproject.toml")["project"]["version"],
        _toml(ROOT / "streamlit_lexical_extended" / "pyproject.toml")[
            "project"
        ]["version"],
        json.loads((FRONTEND / "package.json").read_text())["version"],
    }

    assert len(versions) == 1
    version = versions.pop()
    assert f"## [{version}]" in (ROOT / "CHANGELOG.md").read_text()


def test_exactly_one_production_javascript_and_stylesheet_exist():
    build = FRONTEND / "build"

    assert len(list(build.glob("index-*.js"))) == 1
    assert len(list(build.glob("styles-*.css"))) == 1
    assert not list(build.glob("*-dev.*"))

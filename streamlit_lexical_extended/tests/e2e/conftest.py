import os
import sys
import time
import subprocess
from pathlib import Path
import pytest
import requests
from playwright.sync_api import sync_playwright


def pytest_configure(config):
    """Register custom markers."""
    config.addinivalue_line("markers", "e2e: mark test as end-to-end test")

# Port for the Streamlit test server
TEST_PORT = int(os.environ.get("STREAMLIT_TEST_PORT", "8503"))
TEST_URL = f"http://127.0.0.1:{TEST_PORT}"


def wait_for_server(url: str, timeout: float = 30.0) -> None:
    start = time.time()
    last_err = None
    while time.time() - start < timeout:
        try:
            r = requests.get(url, timeout=1.0)
            if r.status_code < 500:
                return
        except Exception as e:  # noqa: BLE001
            last_err = e
        time.sleep(0.25)
    raise RuntimeError(f"Streamlit server did not come up at {url}: {last_err}")


def _ensure_frontend_built(repo_root: Path) -> None:
    frontend = repo_root / "streamlit_lexical_extended" / "frontend"
    build_dir = frontend / "build"
    # Always build to ensure latest sources are used; this keeps test deterministic
    try:
        subprocess.run(["npm", "run", "build"], cwd=str(frontend), check=True)
    except FileNotFoundError as e:
        raise RuntimeError("npm is required to build the frontend for tests") from e


@pytest.fixture(scope="session")
def server(tmp_path_factory):
    """Start the Streamlit example app in a subprocess using the current venv's Python.

    Requires that playwright browsers are installed and the frontend build exists.
    """
    repo_root = Path(__file__).resolve().parents[3]  # Go up to repo root
    _ensure_frontend_built(repo_root)
    pkg_dir = repo_root / "streamlit_lexical_extended"
    example = pkg_dir / "example.py"

    env = os.environ.copy()
    env.setdefault("STREAMLIT_BROWSER_GATHER_USAGE_STATS", "false")
    env.setdefault("PYTHONUNBUFFERED", "1")

    cmd = [
        sys.executable,
        "-m",
        "streamlit",
        "run",
        str(example),
        "--server.headless",
        "true",
        "--server.port",
        str(TEST_PORT),
        "--server.address",
        "127.0.0.1",
    ]

    proc = subprocess.Popen(
        cmd,
        cwd=str(pkg_dir),
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )

    try:
        wait_for_server(TEST_URL)
    except Exception:
        # Dump some logs for debugging
        try:
            if proc.stdout is not None:
                print(proc.stdout.read())
        finally:
            proc.kill()
        raise

    yield TEST_URL

    # Teardown
    proc.terminate()
    try:
        proc.wait(timeout=5)
    except subprocess.TimeoutExpired:
        proc.kill()


@pytest.fixture(scope="session")
def browser():
    """Provide a Playwright browser instance."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        yield browser
        browser.close()


@pytest.fixture
def page(browser):
    """Provide a new page for each test."""
    context = browser.new_context()
    page = context.new_page()
    yield page
    page.close()
    context.close()

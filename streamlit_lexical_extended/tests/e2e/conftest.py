import os
import subprocess
import sys
import time
from pathlib import Path

import pytest
import requests
from playwright.sync_api import sync_playwright

TEST_PORT = int(os.environ.get("STREAMLIT_TEST_PORT", "8503"))
TEST_URL = f"http://127.0.0.1:{TEST_PORT}"
EXAMPLE_PORT = TEST_PORT + 2
EXAMPLE_URL = f"http://127.0.0.1:{EXAMPLE_PORT}"
RTL_PORT = TEST_PORT + 3
RTL_URL = f"http://127.0.0.1:{RTL_PORT}"


def pytest_configure(config):
    config.addinivalue_line("markers", "e2e: browser-based end-to-end test")


def wait_for_server(url: str, timeout: float = 30.0) -> None:
    deadline = time.time() + timeout
    last_error = None
    while time.time() < deadline:
        try:
            response = requests.get(url, timeout=1.0)
            if response.status_code < 500:
                return
        except Exception as exc:  # noqa: BLE001
            last_error = exc
        time.sleep(0.25)
    raise RuntimeError(f"Streamlit server did not start at {url}: {last_error}")


def _ensure_frontend_built(repo_root: Path) -> None:
    frontend = repo_root / "streamlit_lexical_extended" / "frontend"
    subprocess.run(["npm", "run", "build"], cwd=frontend, check=True)


@pytest.fixture(scope="session")
def server():
    repo_root = Path(__file__).resolve().parents[3]
    _ensure_frontend_built(repo_root)
    app = Path(__file__).with_name("app.py")

    environment = os.environ.copy()
    environment.setdefault("STREAMLIT_BROWSER_GATHER_USAGE_STATS", "false")
    environment.setdefault("PYTHONUNBUFFERED", "1")

    process = subprocess.Popen(
        [
            sys.executable,
            "-m",
            "streamlit",
            "run",
            str(app),
            "--server.headless",
            "true",
            "--server.port",
            str(TEST_PORT),
            "--server.address",
            "127.0.0.1",
        ],
        cwd=repo_root,
        env=environment,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )

    try:
        wait_for_server(TEST_URL)
        yield TEST_URL
    finally:
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()


@pytest.fixture(scope="session")
def example_server():
    repo_root = Path(__file__).resolve().parents[3]
    app = repo_root / "streamlit_lexical_extended" / "example.py"

    environment = os.environ.copy()
    environment.setdefault("STREAMLIT_BROWSER_GATHER_USAGE_STATS", "false")
    environment.setdefault("PYTHONUNBUFFERED", "1")

    process = subprocess.Popen(
        [
            sys.executable,
            "-m",
            "streamlit",
            "run",
            str(app),
            "--server.headless",
            "true",
            "--server.port",
            str(EXAMPLE_PORT),
            "--server.address",
            "127.0.0.1",
        ],
        cwd=repo_root,
        env=environment,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )

    try:
        wait_for_server(EXAMPLE_URL)
        yield EXAMPLE_URL
    finally:
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()


@pytest.fixture(scope="session")
def rtl_server():
    repo_root = Path(__file__).resolve().parents[3]
    app = Path(__file__).with_name("rtl_app.py")

    environment = os.environ.copy()
    environment.setdefault("STREAMLIT_BROWSER_GATHER_USAGE_STATS", "false")
    environment.setdefault("PYTHONUNBUFFERED", "1")

    process = subprocess.Popen(
        [
            sys.executable,
            "-m",
            "streamlit",
            "run",
            str(app),
            "--server.headless",
            "true",
            "--server.port",
            str(RTL_PORT),
            "--server.address",
            "127.0.0.1",
        ],
        cwd=repo_root,
        env=environment,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )

    try:
        wait_for_server(RTL_URL)
        yield RTL_URL
    finally:
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()


@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        yield browser
        browser.close()


@pytest.fixture
def page(browser):
    context = browser.new_context()
    page = context.new_page()
    yield page
    page.close()
    context.close()

"""Streamlit Components v2 bindings for the Lexical Markdown editor."""

from __future__ import annotations

from collections.abc import Callable
from pathlib import Path
from typing import TYPE_CHECKING, Any, Literal, TypeAlias

import streamlit.components.v2 as st_components

import streamlit as st
from streamlit.errors import StreamlitAPIException

if TYPE_CHECKING:
    from streamlit.components.v2.bidi_component.state import ComponentResult

Width: TypeAlias = Literal["stretch", "content"] | int
OnChange: TypeAlias = Callable[[], None] | None

_COMPONENT_NAME = "streamlit-lexical-extended.streamlit_lexical_extended"
_COMPONENT_HTML = '<div class="streamlit-lexical-react-root"></div>'


def _read_single_build_asset(pattern: str) -> str:
    build_dir = Path(__file__).parent / "frontend" / "build"
    matches = sorted(build_dir.glob(pattern))
    if len(matches) != 1:
        raise RuntimeError(
            f"Expected exactly one frontend/build/{pattern} asset, "
            f"found {len(matches)}. Run `npm run build` in the frontend directory."
        )
    return matches[0].read_text(encoding="utf-8")


def _create_component(*, css: str, js: str) -> tuple[Any, bool]:
    try:
        return (
            st_components.component(
                _COMPONENT_NAME,
                html=_COMPONENT_HTML,
                css=css,
                js=js,
                isolate_styles=True,
            ),
            False,
        )
    except TypeError as exc:
        # Streamlit 1.51 configured isolation while mounting. Newer releases
        # moved it to registration, while retaining a tolerant mount fallback.
        if "unexpected keyword argument 'isolate_styles'" not in str(exc):
            raise
        return (
            st_components.component(
                _COMPONENT_NAME,
                html=_COMPONENT_HTML,
                css=css,
                js=js,
            ),
            True,
        )


def _register_component() -> tuple[Any, bool]:
    try:
        return _create_component(
            css="styles-*.css",
            js="index-*.js",
        )
    except StreamlitAPIException as exc:
        # Streamlit's package manifest scanner is owned by the running Runtime.
        # A plain Python import has no Runtime, so register the same compiled
        # assets inline to keep imports and unit tests functional.
        if "must be declared in pyproject.toml with asset_dir" not in str(exc):
            raise
        return _create_component(
            css=_read_single_build_asset("styles-*.css"),
            js=_read_single_build_asset("index-*.js"),
        )


_component, _ISOLATE_STYLES_AT_MOUNT = _register_component()


def _noop() -> None:
    """Provide a stable callback so the ``value`` state always exists."""


def _validate_arguments(
    *,
    value: str | None,
    placeholder: str,
    height: int | None,
    min_height: int,
    debounce: int,
    key: str | None,
    on_change: OnChange,
    width: Width,
) -> None:
    if value is not None and not isinstance(value, str):
        raise TypeError("value must be a string or None.")
    if not isinstance(placeholder, str):
        raise TypeError("placeholder must be a string.")
    if isinstance(height, bool) or (
        height is not None and not isinstance(height, int)
    ):
        raise TypeError("height must be a positive integer or None.")
    if height is not None and height <= 0:
        raise ValueError("height must be greater than 0.")
    if isinstance(min_height, bool) or not isinstance(min_height, int):
        raise TypeError("min_height must be a positive integer.")
    if min_height <= 0:
        raise ValueError("min_height must be greater than 0.")
    if isinstance(debounce, bool) or not isinstance(debounce, int):
        raise TypeError("debounce must be a positive integer.")
    if debounce <= 0:
        raise ValueError("debounce must be greater than 0.")
    if key is not None and not isinstance(key, str):
        raise TypeError("key must be a string or None.")
    if on_change is not None and not callable(on_change):
        raise TypeError("on_change must be callable or None.")
    if isinstance(width, bool):
        raise TypeError(
            'width must be "stretch", "content", or a positive integer.'
        )
    if isinstance(width, int):
        if width <= 0:
            raise ValueError("integer width must be greater than 0.")
    elif width not in ("stretch", "content"):
        raise ValueError('width must be "stretch", "content", or a positive integer.')


def streamlit_lexical_extended(
    value: str | None = "",
    placeholder: str = "",
    height: int | None = None,
    min_height: int = 400,
    debounce: int = 500,
    key: str | None = None,
    on_change: OnChange = None,
    width: Width = "stretch",
) -> ComponentResult:
    """Mount the editor and return its native Components v2 state object.

    The Markdown value is available as ``result.value``. When ``key`` is
    provided, Streamlit stores the result object in ``st.session_state[key]``.
    Pass ``value=None`` to leave the current editor content untouched, or pass
    ``value=""`` to explicitly clear it.
    """

    _validate_arguments(
        value=value,
        placeholder=placeholder,
        height=height,
        min_height=min_height,
        debounce=debounce,
        key=key,
        on_change=on_change,
        width=width,
    )

    initial_value = value if value is not None else ""
    mount_arguments = {
        "key": key,
        "data": {
            "value": value,
            "placeholder": placeholder,
            "minHeight": min_height,
            "debounce": debounce,
            "fixedHeight": height,
        },
        "default": {"value": initial_value},
        "width": width,
        "height": height if height is not None else "content",
        "on_value_change": on_change or _noop,
    }
    if _ISOLATE_STYLES_AT_MOUNT:
        mount_arguments["isolate_styles"] = True
    return _component(**mount_arguments)


__all__ = ["streamlit_lexical_extended"]

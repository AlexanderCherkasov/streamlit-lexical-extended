"""Streamlit Components v2 bindings for the Lexical Markdown editor."""

from __future__ import annotations

from collections.abc import Callable, Sequence
from pathlib import Path
from typing import TYPE_CHECKING, Any, Literal, TypeAlias

import streamlit.components.v2 as st_components

import streamlit as st
from streamlit.errors import StreamlitAPIException

if TYPE_CHECKING:
    from streamlit.components.v2.bidi_component.state import ComponentResult

Width: TypeAlias = Literal["stretch", "content"] | int
OnChange: TypeAlias = Callable[[], None] | None
Toolbar: TypeAlias = Sequence[str] | None

_COMPONENT_NAME = "streamlit-lexical-extended.streamlit_lexical_extended"
_COMPONENT_HTML = '<div class="streamlit-lexical-react-root"></div>'
_TOOLBAR_TOOLS = (
    "undo",
    "redo",
    "block_type",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "quote",
    "bullet_list",
    "numbered_list",
    "table",
)


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
    toolbar: Toolbar,
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
    if toolbar is not None:
        if isinstance(toolbar, (str, bytes)) or not isinstance(toolbar, Sequence):
            raise TypeError("toolbar must be a sequence of tool names or None.")
        if any(not isinstance(tool, str) for tool in toolbar):
            raise TypeError("every toolbar tool name must be a string.")
        unknown_tools = sorted(set(toolbar) - set(_TOOLBAR_TOOLS))
        if unknown_tools:
            supported = ", ".join(_TOOLBAR_TOOLS)
            raise ValueError(
                f"Unknown toolbar tools: {', '.join(unknown_tools)}. "
                f"Supported tools: {supported}."
            )
        if len(set(toolbar)) != len(toolbar):
            raise ValueError("toolbar tool names must be unique.")


def streamlit_lexical_extended(
    value: str | None = "",
    placeholder: str = "",
    height: int | None = None,
    min_height: int = 400,
    debounce: int = 500,
    key: str | None = None,
    on_change: OnChange = None,
    width: Width = "stretch",
    toolbar: Toolbar = None,
) -> str:
    """Mount the editor and return its Markdown string value natively.

    When ``key`` is provided, Streamlit stores the editor value in
    ``st.session_state[key]``. Pass ``value=None`` to leave the current editor
    content untouched, or pass ``value=""`` to explicitly clear it.
    ``toolbar=None`` displays every control, a sequence displays only those
    controls, and an empty sequence hides the toolbar.
    """

    if value is not None and not isinstance(value, str):
        if hasattr(value, "value"):
            value = getattr(value, "value", "")
        elif isinstance(value, dict):
            value = value.get("value", "")
        if isinstance(value, dict):
            value = value.get("value", "")

    _validate_arguments(
        value=value,
        placeholder=placeholder,
        height=height,
        min_height=min_height,
        debounce=debounce,
        key=key,
        on_change=on_change,
        width=width,
        toolbar=toolbar,
    )

    prev_internal_val = (
        st.session_state.get(f"_lexical_internal_val_{key}")
        if key is not None
        else None
    )
    is_external_update = (
        value is not None
        and key is not None
        and prev_internal_val is not None
        and value != prev_internal_val
    )

    internal_value = value
    if key is not None:
        if is_external_update or prev_internal_val is None:
            st.session_state[f"_lexical_internal_val_{key}"] = value

    def _handle_on_change() -> None:
        if key is not None and key in st.session_state:
            raw = st.session_state[key]
            if hasattr(raw, "value"):
                val = raw.value
            elif isinstance(raw, dict):
                val = raw.get("value", "")
            else:
                val = raw or ""
            if isinstance(val, dict):
                val = val.get("value", "")
            if isinstance(val, str):
                st.session_state[f"_lexical_internal_val_{key}"] = val
        if on_change is not None:
            on_change()

    initial_value = value if value is not None else ""
    mount_arguments = {
        "key": key,
        "data": {
            "value": internal_value,
            "placeholder": placeholder,
            "minHeight": min_height,
            "debounce": debounce,
            "fixedHeight": height,
            "toolbar": list(toolbar) if toolbar is not None else None,
        },
        "default": {"value": initial_value},
        "width": width,
        "height": height if height is not None else "content",
        "on_value_change": _handle_on_change,
    }
    if _ISOLATE_STYLES_AT_MOUNT:
        mount_arguments["isolate_styles"] = True

    raw_result = _component(**mount_arguments)

    if is_external_update:
        return value

    if hasattr(raw_result, "value"):
        result_str = raw_result.value
    elif isinstance(raw_result, dict):
        result_str = raw_result.get("value", "")
    else:
        result_str = raw_result or ""

    if isinstance(result_str, dict):
        result_str = result_str.get("value", "")

    if key is not None and result_str is not None:
        st.session_state[f"_lexical_internal_val_{key}"] = result_str

    return result_str if isinstance(result_str, str) else (value or "")


__all__ = ["streamlit_lexical_extended"]

from types import SimpleNamespace

import pytest

import streamlit_lexical_extended as lexical


@pytest.fixture
def component_spy(monkeypatch):
    calls = []

    def component(**kwargs):
        calls.append(kwargs)
        return SimpleNamespace(value=kwargs["default"]["value"])

    monkeypatch.setattr(lexical, "_component", component)
    monkeypatch.setattr(lexical, "_ISOLATE_STYLES_AT_MOUNT", False)
    monkeypatch.setattr(lexical.st, "session_state", {})
    return calls


def test_api_returns_result_and_mounts_v2_contract(component_spy):
    result = lexical.streamlit_lexical_extended(
        value="# Native",
        placeholder="Write",
        min_height=240,
        debounce=250,
        key="native",
        width=640,
    )

    assert result.value == "# Native"
    assert component_spy == [
        {
            "key": "native",
            "data": {
                "value": "# Native",
                "placeholder": "Write",
                "minHeight": 240,
                "debounce": 250,
                "fixedHeight": None,
            },
            "default": {"value": "# Native"},
            "width": 640,
            "height": "content",
            "on_value_change": component_spy[0]["on_value_change"],
        }
    ]


def test_public_api_contains_only_native_component_function():
    assert lexical.__all__ == ["streamlit_lexical_extended"]
    assert not hasattr(lexical, "streamlit_lexical_extended_v2")
    assert not hasattr(lexical, "_legacy_component_key")


def test_none_sends_no_update_but_empty_string_clears(component_spy):
    lexical.streamlit_lexical_extended(value=None)
    lexical.streamlit_lexical_extended(value="")

    assert component_spy[0]["data"]["value"] is None
    assert component_spy[0]["default"] == {"value": ""}
    assert component_spy[1]["data"]["value"] == ""


def test_fixed_height_uses_native_mounting_size(component_spy):
    lexical.streamlit_lexical_extended(height=360, width="stretch")

    assert component_spy[0]["height"] == 360
    assert component_spy[0]["data"]["fixedHeight"] == 360
    assert component_spy[0]["width"] == "stretch"


def test_callback_reads_native_result_from_session_state(monkeypatch):
    session_state = {}
    observed = []

    def component(**kwargs):
        internal_key = kwargs["key"]
        session_state[internal_key] = SimpleNamespace(value="Changed in browser")
        kwargs["on_value_change"]()
        return session_state[internal_key]

    monkeypatch.setattr(lexical, "_component", component)
    monkeypatch.setattr(lexical.st, "session_state", session_state)

    result = lexical.streamlit_lexical_extended(
        value="Initial",
        key="editor",
        on_change=lambda: observed.append(session_state["editor"].value),
    )

    assert result.value == "Changed in browser"
    assert session_state["editor"].value == "Changed in browser"
    assert observed == ["Changed in browser"]


@pytest.mark.parametrize(
    ("kwargs", "exception"),
    [
        ({"value": 1}, TypeError),
        ({"placeholder": None}, TypeError),
        ({"height": 0}, ValueError),
        ({"height": True}, TypeError),
        ({"min_height": 0}, ValueError),
        ({"debounce": 0}, ValueError),
        ({"key": 42}, TypeError),
        ({"on_change": "callback"}, TypeError),
        ({"width": "wide"}, ValueError),
        ({"width": 0}, ValueError),
        ({"width": True}, TypeError),
    ],
)
def test_argument_validation(component_spy, kwargs, exception):
    with pytest.raises(exception):
        lexical.streamlit_lexical_extended(**kwargs)

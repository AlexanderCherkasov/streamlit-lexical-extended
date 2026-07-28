import streamlit as st

from streamlit_lexical_extended import streamlit_lexical_extended
from streamlit_lexical_extended.demo_content import FULL_FORMATTING_MARKDOWN


st.set_page_config(page_title="Streamlit Lexical", page_icon="📝")
st.title("Lexical Rich Text Editor")
st.caption(
    "A native Streamlit Components v2 editor rendered directly in the app DOM."
)

st.session_state.setdefault("source_markdown", FULL_FORMATTING_MARKDOWN)


def sync_source() -> None:
    """Keep the Python input aligned with the native ComponentResult."""

    result = st.session_state.get("editor")
    value = (
        result.get("value")
        if isinstance(result, dict)
        else getattr(result, "value", None)
    )
    if isinstance(value, str):
        st.session_state.source_markdown = value


st.subheader("Native component API")
st.caption(
    "Returns ComponentResult; Markdown is available as result.value and "
    "session state keeps the same native result object."
)
source_markdown = st.text_area(
    "Input Markdown",
    key="source_markdown",
    height=320,
)
result = streamlit_lexical_extended(
    value=source_markdown,
    placeholder="Write Markdown…",
    key="editor",
    height=520,
    debounce=300,
    on_change=sync_source,
)
st.session_state.output_markdown = result.value
st.text_area(
    "Output Markdown",
    key="output_markdown",
    height=320,
    disabled=True,
)

import streamlit as st

from streamlit_lexical_extended import streamlit_lexical_extended
from streamlit_lexical_extended.demo_content import FULL_FORMATTING_MARKDOWN

TOOLBAR_TOOLS = [
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
]

st.set_page_config(page_title="Streamlit Lexical", page_icon="📝")
st.title("Lexical Rich Text Editor")
st.caption(
    "A native Streamlit Components v2 editor rendered directly in the app DOM."
)

st.session_state.setdefault("source_markdown", FULL_FORMATTING_MARKDOWN)

with st.sidebar:
    st.subheader("Toolbar configuration")
    toolbar = st.multiselect(
        "Visible tools",
        options=TOOLBAR_TOOLS,
        default=TOOLBAR_TOOLS,
    )


def sync_source() -> None:
    """Keep the Python input aligned with the native editor string."""

    value = st.session_state.get("editor")
    if isinstance(value, str):
        st.session_state.source_markdown = value


st.subheader("Native component API")
st.caption(
    "Returns str natively; Markdown is directly returned as a string and "
    "session state stores the same string."
)
source_markdown = st.text_area(
    "Input Markdown",
    key="source_markdown",
    height=320,
)
result_text = streamlit_lexical_extended(
    value=source_markdown,
    placeholder="Write Markdown…",
    key="editor",
    height=520,
    debounce=300,
    on_change=sync_source,
    toolbar=toolbar,
)
st.session_state.output_markdown = result_text
st.text_area(
    "Output Markdown",
    key="output_markdown",
    height=320,
    disabled=True,
)

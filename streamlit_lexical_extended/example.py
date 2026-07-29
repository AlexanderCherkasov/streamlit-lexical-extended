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

st.set_page_config(page_title="Streamlit Lexical Extended", page_icon="📝", layout="wide")
st.title("Lexical Rich Text Editor Demo")

st.session_state.setdefault("source_markdown", FULL_FORMATTING_MARKDOWN)
st.session_state.setdefault(
    "shared_markdown_content",
    "# Synchronized Editors Test\n\nEdit text in **Editor 1** or **Editor 2** below. "
    "Both editors stay in sync on rerun without infinite echo loops!",
)

if "rerun_count" not in st.session_state:
    st.session_state.rerun_count = 0
st.session_state.rerun_count += 1

with st.sidebar:
    st.subheader("Toolbar Configuration")
    toolbar = st.multiselect(
        "Visible tools",
        options=TOOLBAR_TOOLS,
        default=TOOLBAR_TOOLS,
    )
    st.divider()
    st.metric("Total App Reruns", st.session_state.rerun_count)


tab1, tab2 = st.tabs(
    ["Single Editor & Source Sync", "Two Synchronized Editors & Dialog Test"]
)

with tab1:
    st.subheader("Single Editor API Demo")
    st.caption(
        "Demonstrates two-way binding between a raw Markdown text_area and the Lexical editor."
    )

    def sync_source() -> None:
        value = st.session_state.get("_lexical_internal_val_main_editor")
        if isinstance(value, str):
            st.session_state.source_markdown = value

    source_markdown = st.text_area(
        "Input Markdown Source",
        key="source_markdown",
        height=200,
    )
    result_text = streamlit_lexical_extended(
        value=source_markdown,
        placeholder="Write Markdown…",
        key="main_editor",
        height=400,
        debounce=300,
        on_change=sync_source,
        toolbar=toolbar,
    )
    st.text_area(
        "Output Returned String",
        value=result_text,
        height=150,
        disabled=True,
    )

with tab2:
    st.subheader("Shared State & Echo-Free Dual Editor Test")
    st.markdown(
        "Both editors below share the same state variable (`st.session_state.shared_markdown_content`). "
        "Type in **either** editor to test real-time synchronization, echo suppression, and cursor stability."
    )

    col_actions1, col_actions2 = st.columns([1, 4])
    with col_actions1:
        if st.button("Reset Shared State", type="secondary"):
            st.session_state.shared_markdown_content = (
                "# Reset Document\n\nFresh content applied from Python!"
            )
            st.rerun()

    def on_editor1_change() -> None:
        val = st.session_state.get("_lexical_internal_val_sync_editor_1")
        if val is not None:
            st.session_state.shared_markdown_content = val

    def on_editor2_change() -> None:
        val = st.session_state.get("_lexical_internal_val_sync_editor_2")
        if val is not None:
            st.session_state.shared_markdown_content = val

    col_ed1, col_ed2 = st.columns(2)
    with col_ed1:
        st.markdown("#### Editor 1 (`key='sync_editor_1'`)")
        val1 = streamlit_lexical_extended(
            value=st.session_state.shared_markdown_content,
            key="sync_editor_1",
            placeholder="Type in Editor 1...",
            height=350,
            on_change=on_editor1_change,
            toolbar=toolbar,
        )

    with col_ed2:
        st.markdown("#### Editor 2 (`key='sync_editor_2'`)")
        val2 = streamlit_lexical_extended(
            value=st.session_state.shared_markdown_content,
            key="sync_editor_2",
            placeholder="Type in Editor 2...",
            height=350,
            on_change=on_editor2_change,
            toolbar=toolbar,
        )

    st.divider()

    @st.dialog("Lexical Editor in Modal Dialog", width="large")
    def test_dialog_editor() -> None:
        st.markdown("This editor is instantiated inside an `@st.dialog` modal overlay.")
        streamlit_lexical_extended(
            value=st.session_state.shared_markdown_content,
            key="dialog_sync_editor",
            height=350,
            on_change=lambda: st.session_state.update(
                shared_markdown_content=st.session_state.get(
                    "_lexical_internal_val_dialog_sync_editor"
                )
                or st.session_state.shared_markdown_content
            ),
            toolbar=toolbar,
        )
        if st.button("Close Modal"):
            st.rerun()

    if st.button("Open Dialog Editor Modal Test", type="primary"):
        test_dialog_editor()

    st.subheader("Current Shared Markdown State")
    st.code(st.session_state.shared_markdown_content, language="markdown")

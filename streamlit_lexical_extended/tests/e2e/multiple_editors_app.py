import streamlit as st

from streamlit_lexical_extended import streamlit_lexical_extended


st.set_page_config(page_title="Multiple editor test", layout="wide")
st.title("Dialog with two editors")

st.session_state.setdefault("document_a", "# Editor 1\n\nStart typing...")
st.session_state.setdefault("document_b", "# Editor 2\n\nStart typing...")


if "show_dialog" not in st.session_state:
    st.session_state.show_dialog = False


def open_dialog() -> None:
    st.session_state.show_dialog = True


def close_dialog() -> None:
    st.session_state.show_dialog = False


@st.dialog("Two editors", width="large")
def show_editors() -> None:
    def document_a_changed() -> None:
        val = st.session_state.get("_lexical_internal_val_dialog_editor_a") or getattr(st.session_state.get("dialog_editor_a"), "value", "")
        st.session_state.document_a = val if isinstance(val, str) else str(val)

    def document_b_changed() -> None:
        val = st.session_state.get("_lexical_internal_val_dialog_editor_b") or getattr(st.session_state.get("dialog_editor_b"), "value", "")
        st.session_state.document_b = val if isinstance(val, str) else str(val)

    left, right = st.columns(2)
    with left:
        streamlit_lexical_extended(
            value=st.session_state.document_a,
            key="dialog_editor_a",
            height=420,
            on_change=document_a_changed,
        )
    with right:
        streamlit_lexical_extended(
            value=st.session_state.document_b,
            key="dialog_editor_b",
            height=420,
            on_change=document_b_changed,
        )

    if st.button("Close", on_click=close_dialog):
        st.rerun()


st.button("Open dialog", on_click=open_dialog)

if st.session_state.show_dialog:
    show_editors()

st.subheader("Current content")
st.code(st.session_state.document_a, language="markdown")
st.code(st.session_state.document_b, language="markdown")

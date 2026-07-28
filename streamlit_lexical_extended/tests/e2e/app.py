import streamlit as st

from streamlit_lexical_extended import streamlit_lexical_extended

INITIAL = """# Product Notes

This editor is powered by **Lexical** and uses Streamlit Components v2.

## Checklist

- Write Markdown
- Format rich text
- Edit tables

```python
print("round trip")
```

| Product | Owner | Status |
| --- | --- | --- |
| Editor | Platform | **Ready** |
| Tables | Docs | In review |
"""

if "document" not in st.session_state:
    st.session_state.document = INITIAL
if "callback_count" not in st.session_state:
    st.session_state.callback_count = 0


def editor_changed() -> None:
    st.session_state.document = st.session_state.main_editor.value
    st.session_state.callback_count += 1


st.title("Streamlit Lexical v2 E2E")

control_a, control_b = st.columns(2)
if control_a.button("Load external update"):
    st.session_state.document = "# External Update\n\nLoaded from Python."
if control_b.button("Clear editor"):
    st.session_state.document = ""

result = streamlit_lexical_extended(
    value=st.session_state.document,
    key="main_editor",
    height=420,
    debounce=200,
    on_change=editor_changed,
)

st.write(f"Callback count: {st.session_state.callback_count}")
st.subheader("Synchronized Markdown")
st.text(result.value)

st.subheader("Automatic height native editor")
native = streamlit_lexical_extended(
    value="Native v2 value",
    key="native_editor",
    height=None,
    min_height=180,
)
st.text(native.value)

st.subheader("Independent editors")
left, right = st.columns(2)
with left:
    streamlit_lexical_extended(
        value="Left seed",
        key="left_editor",
        height=180,
        debounce=200,
    )
with right:
    streamlit_lexical_extended(
        value="Right seed",
        key="right_editor",
        height=180,
        debounce=200,
    )

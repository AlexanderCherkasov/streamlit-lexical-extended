import streamlit as st

from streamlit_lexical_extended import streamlit_lexical_extended

RTL_MARKDOWN = """# מסמך לדוגמה

פסקה בעברית עם **טקסט מודגש** ו-*טקסט נטוי*.

> ציטוט שמתחיל בצד ימין.

- פריט ראשון
- פריט שני
- פריט שלישי

1. שלב ראשון
2. שלב שני

| משימה | אחראי | מצב |
| --- | --- | --- |
| עריכה | דנה | מוכן |
| בדיקה | יוסף | בתהליך |
"""

st.set_page_config(page_title="RTL component test")
st.title("Inherited RTL test")

rtl_tab, explanation_tab = st.tabs(["RTL editor", "Test contract"])

with rtl_tab:
    st.markdown(
        """
<style>
body, html {
    direction: RTL;
    unicode-bidi: bidi-override;
    text-align: right;
}
p, div, input, label, h1, h2, h3, h4, h5, h6 {
    direction: RTL;
    unicode-bidi: bidi-override;
    text-align: right;
}
</style>
""",
        unsafe_allow_html=True,
    )

    if "rtl_output" not in st.session_state:
        st.session_state.rtl_output = RTL_MARKDOWN

    def rtl_changed() -> None:
        val = st.session_state.get("rtl_editor")
        if hasattr(val, "value"):
            val = val.value
        if isinstance(val, dict):
            val = val.get("value", "")
        if isinstance(val, str):
            st.session_state.rtl_output = val

    result = streamlit_lexical_extended(
        value=RTL_MARKDOWN,
        placeholder="התחילו לכתוב…",
        key="rtl_editor",
        height=480,
        debounce=200,
        on_change=rtl_changed,
    )
    st.text_area(
        "RTL Markdown output",
        key="rtl_output",
        height=240,
        disabled=True,
    )

with explanation_tab:
    st.write(
        "The component receives no direction argument. RTL is inherited from "
        "the parent application's computed styles."
    )

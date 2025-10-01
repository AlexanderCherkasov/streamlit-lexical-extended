#!/usr/bin/env python3
import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended

st.title("Minimal Component Test")
st.write("Testing if component renders at all...")

try:
    result = streamlit_lexical_extended(
        value="# Hello World\n\nTest content",
        placeholder="Type here...",
        height=300,
        key="minimal_test"
    )
    
    st.success("✅ Component rendered!")
    st.write(f"**Result type:** {type(result)}")
    st.write(f"**Result value:** {repr(result)}")
    st.write(f"**Result length:** {len(result) if result else 0}")
    
    if result:
        st.code(result, language="markdown")
    else:
        st.error("Result is None or empty!")
        
except Exception as e:
    st.error(f"❌ Component failed to render: {e}")
    import traceback
    st.code(traceback.format_exc())

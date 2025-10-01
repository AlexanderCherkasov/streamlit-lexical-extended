import streamlit as st
from streamlit_lexical_extended import streamlit_lexical

st.title("Test Rerun Fix")

# Add a button to trigger reruns
if st.button("Trigger Rerun"):
    st.write("Button clicked!")

# Test the editor
value = streamlit_lexical(
    value="# Test\nThis is a test document.",
    placeholder="Enter text...",
    key="test_editor"
)

st.write("Editor returned:", repr(value))

# Show current value
if value:
    st.markdown("**Current content:**")
    st.code(value)
else:
    st.error("Editor returned None or empty!")
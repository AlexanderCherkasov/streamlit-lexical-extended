import streamlit as st
from streamlit_lexical_extended import streamlit_lexical

st.title("Test Quotes")

# Test markdown with quotes
test_markdown = """# Test Document

This is a normal paragraph.

> This is a quote block
> with multiple lines
> that should be rendered properly

Another normal paragraph.

> Single line quote

Final paragraph."""

# Display the editor
result = streamlit_lexical(
    value=test_markdown,
    placeholder="Type something...",
    min_height=400,
    key="quote_test"
)

st.write("Result:")
st.code(result)
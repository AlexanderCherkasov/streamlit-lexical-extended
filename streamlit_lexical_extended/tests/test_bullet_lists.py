#!/usr/bin/env python3

import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended

st.title("Test Bullet Lists")

# Test markdown with bullet lists
test_markdown = """# Test Document

## Simple Bullet List
- First item
- Second item  
- Third item

## Mixed Content
Some text before the list.

- Bullet item 1
- Bullet item 2

Some text after the list.
"""

st.write("Testing bullet list rendering:")

# Create the editor with the test markdown
result = streamlit_lexical_extended(
    value=test_markdown,
    placeholder="Type something...",
    height=400,
    key="bullet_test"
)

st.write("Current markdown content:")
st.code(result if result else "No content")
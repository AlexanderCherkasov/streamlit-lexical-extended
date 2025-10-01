#!/usr/bin/env python3

import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended

st.title("Simple Test")

# Simple test with bullet lists
test_content = """# Test

## Bullet List
- Item 1
- Item 2
- Item 3

## Table
| Name | Age |
|------|-----|
| John | 25  |
| Jane | 30  |
"""

result = streamlit_lexical_extended(
    value=test_content,
    placeholder="Type here...",
    height=300,
    key="simple_test"
)

st.write("Result:")
st.code(result if result else "No content")
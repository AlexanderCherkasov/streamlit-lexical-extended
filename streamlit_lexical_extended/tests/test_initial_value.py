#!/usr/bin/env python3

import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended

st.title("Test Initial Value Return")

# Test content
test_content = """# Test Document

This is a test to see if the component returns the initial value.

## List
- Item 1
- Item 2

## Table
| Name | Value |
|------|-------|
| Test | 123   |
"""

st.write("Testing if component returns initial value instead of null...")

result = streamlit_lexical_extended(
    value=test_content,
    placeholder="Type here...",
    height=300,
    key="initial_value_test"
)

st.write("**Result type:**", type(result))
st.write("**Result is None:**", result is None)
st.write("**Result length:**", len(result) if result else 0)

if result:
    st.success("✅ Component returned content!")
    st.code(result[:200] + "..." if len(result) > 200 else result)
else:
    st.error("❌ Component returned null/None")

st.write("**Expected behavior:** Component should return the initial markdown content immediately, not null.")
#!/usr/bin/env python3

import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended

st.title("Test Editor Formatting Features")

# Test markdown with all the new features
test_markdown = """# Test Document

This is a paragraph with **bold**, *italic*, ~~strikethrough~~ text.

> This is a quote block
> It can span multiple lines

## Lists

### Bullet List
- First item
- Second item
- Third item

### Numbered List
1. First numbered item
2. Second numbered item
3. Third numbered item

## Links

Here is a [link to Google](https://www.google.com) in the text.

## Table

| Name | Age | City |
|------|-----|------|
| Alice | 30 | London |
| Bob | 25 | Paris |
"""

st.write("**Initial Content:**")
st.code(test_markdown, language="markdown")

# Create the editor
result = streamlit_lexical(
    value=test_markdown,
    placeholder="Start typing...",
    min_height=400,
    key="test_editor"
)

st.write("**Editor Output:**")
if result:
    st.code(result, language="markdown")
else:
    st.write("No content yet")
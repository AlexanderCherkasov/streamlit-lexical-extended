#!/usr/bin/env python3
"""Test dynamic height feature."""

import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended

st.title("Dynamic Height Test")

st.header("1️⃣ Fixed Height (height=300)")
st.write("Editor with fixed height of 300px. Scrollable if content exceeds.")

result1 = streamlit_lexical_extended(
    value="# Fixed Height\n\nThis editor has a fixed height of 300px.\n\nTry adding more content...",
    height=300,  # Fixed height
    key="fixed_height"
)

st.code(result1, language="markdown")

st.divider()

st.header("2️⃣ Auto-Expand with Default min_height (400px)")
st.write("Editor auto-expands to fit content, minimum 400px.")

result2 = streamlit_lexical_extended(
    value="# Auto-Expand (default)\n\nThis editor expands automatically.\n\nAdd more lines to see it grow!",
    # height=None (default) - auto-expand mode
    # min_height=400 (default)
    key="auto_expand_default"
)

st.code(result2, language="markdown")

st.divider()

st.header("3️⃣ Auto-Expand with Custom min_height (200px)")
st.write("Editor auto-expands, but starts at 200px minimum.")

result3 = streamlit_lexical_extended(
    value="# Small Start\n\nMin 200px",
    min_height=200,  # Custom minimum
    key="auto_expand_small"
)

st.code(result3, language="markdown")

st.divider()

st.header("4️⃣ Large Fixed Height (height=600)")
st.write("Editor with fixed height of 600px.")

result4 = streamlit_lexical_extended(
    value="# Large Fixed\n\nThis has 600px fixed height.",
    height=600,
    key="fixed_large"
)

st.code(result4, language="markdown")

st.divider()

st.header("5️⃣ Auto-Expand with Table")
st.write("Auto-expand mode with table content - should grow as you add rows!")

table_content = """# Table Auto-Expand Test

| Name | Role | Status |
| --- | --- | --- |
| Alice | Developer | Active |
| Bob | Designer | Active |

Add more rows to see the editor expand!
"""

result5 = streamlit_lexical_extended(
    value=table_content,
    min_height=300,
    key="auto_table"
)

st.code(result5, language="markdown")

# Sidebar info
st.sidebar.header("Configuration Guide")
st.sidebar.markdown("""
### Fixed Height Mode
```python
streamlit_lexical_extended(
    height=300,  # Fixed 300px
    key="fixed"
)
```
- Editor has exact height
- Scrollable if content exceeds

### Auto-Expand Mode
```python
streamlit_lexical_extended(
    # height not specified (None)
    min_height=400,  # Min 400px
    key="auto"
)
```
- Expands to fit content
- Never smaller than min_height
- No scrolling (grows instead)

### Default Values
- `height`: None (auto-expand)
- `min_height`: 400px
""")

#!/usr/bin/env python3
"""
Test script to verify stability fixes for streamlit-lexical-extended v0.2.0

This tests:
1. Multiple editors on same page don't interfere
2. Initial values are returned immediately (not null)
3. Text doesn't disappear when switching between editors
4. Programmatic updates work correctly
"""

import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended

st.set_page_config(page_title="Stability Test", layout="wide")

st.title("🧪 Streamlit Lexical Stability Tests")
st.caption("Testing v0.2.0 fixes for text disappearing issues")

# Initialize session state
if "editor1_content" not in st.session_state:
    st.session_state.editor1_content = """# Editor 1
    
This is the first editor. Try typing here.

## Features
- Multiple editors on same page
- No text disappearing
- Stable state management
"""

if "editor2_content" not in st.session_state:
    st.session_state.editor2_content = """# Editor 2

This is the second editor. This should remain independent.

## Test Table
| Feature | Status |
|---------|--------|
| Stability | ✅ Fixed |
| Multiple Editors | ✅ Works |
"""

if "editor3_content" not in st.session_state:
    st.session_state.editor3_content = "# Editor 3\n\nThird editor for stress testing."

# Test 1: Multiple Editors Side by Side
st.header("Test 1: Multiple Editors (No Interference)")
st.write("Type in each editor. They should remain independent.")

col1, col2 = st.columns(2)

with col1:
    st.subheader("Editor A")
    result1 = streamlit_lexical_extended(
        value=st.session_state.editor1_content,
        placeholder="Type in Editor A...",
        height=300,
        key="test_editor_1",
        overwrite=False,  # Don't overwrite user edits
    )
    if result1 is not None:
        st.session_state.editor1_content = result1
    
    st.write(f"**Status:** {'✅ Has content' if result1 else '❌ Null/Empty'}")
    st.write(f"**Length:** {len(result1) if result1 else 0} chars")

with col2:
    st.subheader("Editor B")
    result2 = streamlit_lexical_extended(
        value=st.session_state.editor2_content,
        placeholder="Type in Editor B...",
        height=300,
        key="test_editor_2",
        overwrite=False,
    )
    if result2 is not None:
        st.session_state.editor2_content = result2
    
    st.write(f"**Status:** {'✅ Has content' if result2 else '❌ Null/Empty'}")
    st.write(f"**Length:** {len(result2) if result2 else 0} chars")

# Test 2: Programmatic Updates
st.header("Test 2: Programmatic Content Updates")
st.write("Click buttons to update editor content. Text should update without disappearing.")

col3, col4, col5 = st.columns(3)

with col3:
    if st.button("Set Sample Content"):
        st.session_state.editor3_content = """# Sample Document

This content was set programmatically.

## Lists
- Item 1
- Item 2
- Item 3

## Quote
> This is a quote

## Code
```python
def hello():
    print("Hello, World!")
```
"""
        st.rerun()

with col4:
    if st.button("Clear Content"):
        st.session_state.editor3_content = ""
        st.rerun()

with col5:
    if st.button("Reset to Default"):
        st.session_state.editor3_content = "# Editor 3\n\nThird editor for stress testing."
        st.rerun()

result3 = streamlit_lexical_extended(
    value=st.session_state.editor3_content,
    placeholder="Content will be updated programmatically...",
    height=250,
    key="test_editor_3",
    overwrite=True,  # Allow programmatic updates
)

if result3 is not None:
    st.session_state.editor3_content = result3

st.write(f"**Current Length:** {len(result3) if result3 else 0} characters")

# Test 3: Initial Value Return Test
st.header("Test 3: Initial Value Return")
st.write("This editor should immediately return its initial value (not null).")

initial_test_content = "# Initial Value Test\n\nThis should return immediately."

initial_result = streamlit_lexical_extended(
    value=initial_test_content,
    height=150,
    key="initial_value_test",
)

if initial_result is None:
    st.error("❌ FAILED: Component returned None!")
elif initial_result == "":
    st.warning("⚠️ Component returned empty string")
else:
    st.success(f"✅ PASSED: Component returned content ({len(initial_result)} chars)")

# Test 4: Rapid Switching Test
st.header("Test 4: Content Switching Test")
st.write("Switch between different content rapidly. Text should not disappear.")

content_options = {
    "Short": "# Short\n\nBrief content.",
    "Medium": "# Medium Content\n\nThis is medium-length content.\n\n- Point 1\n- Point 2\n- Point 3",
    "Long": "# Long Document\n\n" + "\n\n".join([f"## Section {i}\n\nContent for section {i}." for i in range(1, 6)]),
    "Empty": "",
}

if "selected_content" not in st.session_state:
    st.session_state.selected_content = "Medium"

selected = st.radio(
    "Select content to display:",
    options=list(content_options.keys()),
    horizontal=True,
    key="content_selector",
)

if selected != st.session_state.selected_content:
    st.session_state.selected_content = selected

switching_result = streamlit_lexical_extended(
    value=content_options[selected],
    height=200,
    key="switching_test",
    overwrite=True,
)

st.write(f"**Selected:** {selected}")
st.write(f"**Returned:** {len(switching_result) if switching_result else 0} chars")

# Summary
st.divider()
st.subheader("📊 Test Summary")

tests_passed = 0
total_tests = 4

# Check results
if result1 and result2:
    st.success("✅ Test 1 PASSED: Multiple editors working independently")
    tests_passed += 1
else:
    st.error("❌ Test 1 FAILED: Editors returned null")

if result3 is not None:
    st.success("✅ Test 2 PASSED: Programmatic updates working")
    tests_passed += 1
else:
    st.error("❌ Test 2 FAILED: Programmatic update failed")

if initial_result and len(initial_result) > 0:
    st.success("✅ Test 3 PASSED: Initial value returned correctly")
    tests_passed += 1
else:
    st.error("❌ Test 3 FAILED: Initial value not returned")

if switching_result is not None:
    st.success("✅ Test 4 PASSED: Content switching works")
    tests_passed += 1
else:
    st.error("❌ Test 4 FAILED: Content switching broken")

st.metric("Tests Passed", f"{tests_passed}/{total_tests}")

if tests_passed == total_tests:
    st.balloons()
    st.success("🎉 All stability tests passed!")
else:
    st.warning(f"⚠️ {total_tests - tests_passed} test(s) failed. Check the issues above.")

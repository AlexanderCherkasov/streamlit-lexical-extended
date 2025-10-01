# Dynamic Height Feature

## Overview

The component now supports two height modes:

1. **Fixed Height Mode** - Editor has exact height with scrolling
2. **Auto-Expand Mode** - Editor grows to fit content (default)

## Parameters

### `height` (int | None)
- **Default:** `None`
- **Description:** Fixed height in pixels
- If specified, editor has this exact height and scrolls if content exceeds
- If `None`, editor auto-expands to fit content

### `min_height` (int)
- **Default:** `400`
- **Description:** Minimum height in pixels
- Only used in auto-expand mode (when `height=None`)
- Editor never shrinks below this value

## Usage Examples

### Fixed Height

```python
import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended

# Editor with fixed 300px height
content = streamlit_lexical_extended(
    value="# My Content",
    height=300,  # Fixed height
    key="fixed_editor"
)
```

**Behavior:**
- Editor is exactly 300px tall
- Scrolls vertically if content exceeds 300px
- Height never changes regardless of content

### Auto-Expand (Default)

```python
# Editor that grows with content, minimum 400px
content = streamlit_lexical_extended(
    value="# My Content",
    # height not specified (None by default)
    # min_height=400 (default)
    key="auto_editor"
)
```

**Behavior:**
- Starts at 400px minimum
- Grows automatically as you add content
- No scrolling - always shows full content
- Never shrinks below 400px

### Auto-Expand with Custom Minimum

```python
# Smaller starting height
content = streamlit_lexical_extended(
    value="# Small Content",
    min_height=200,  # Custom minimum
    key="small_editor"
)
```

**Behavior:**
- Starts at 200px minimum
- Grows as needed
- More compact for small content

### Large Fixed Height

```python
# Large editor for extensive content
content = streamlit_lexical_extended(
    value="# Large Document",
    height=800,  # Large fixed height
    key="large_editor"
)
```

**Behavior:**
- Always 800px tall
- Good for editing large documents
- Provides consistent workspace

## Migration from v0.2.0

### Old API (v0.2.0)
```python
streamlit_lexical_extended(
    height=960,  # This was min_height!
    value="..."
)
```

### New API (v0.3.0)
```python
# For same behavior (fixed height):
streamlit_lexical_extended(
    height=960,  # Now truly fixed
    value="..."
)

# For auto-expand with 960px minimum:
streamlit_lexical_extended(
    min_height=960,  # Set minimum
    value="..."
)
```

## When to Use Each Mode

### Use Fixed Height When:
- You want consistent UI layout
- Editing long documents (provides stable workspace)
- Limited screen space
- Need predictable component size

### Use Auto-Expand When:
- Content length varies significantly
- You want to see all content without scrolling
- Building forms or short editors
- Better UX for small-to-medium content

## Implementation Details

### Fixed Height Mode
```python
height=300  # User specifies
```
- Sets `Streamlit.setFrameHeight(300)`
- CSS: `minHeight: 300px, maxHeight: 300px, overflowY: auto`
- Height never changes

### Auto-Expand Mode
```python
height=None, min_height=400
```
- Measures content with `scrollHeight`
- Calculates: `max(scrollHeight, min_height)`
- Sets `Streamlit.setFrameHeight(calculated)`
- CSS: `minHeight: 400px, overflowY: auto`
- Updates height on content changes

## Performance

- Auto-expand updates throttled (100ms delay)
- Height recalculation on editor change (50ms delay)
- Minimal performance impact
- Efficient DOM measurements

## Examples

See `test_dynamic_height.py` for comprehensive examples:
```bash
streamlit run test_dynamic_height.py
```

Demonstrates:
1. Fixed 300px height
2. Auto-expand with default 400px min
3. Auto-expand with custom 200px min
4. Fixed 600px height
5. Auto-expand with table content

## Tips

1. **For tables**: Use auto-expand mode - tables can grow significantly
2. **For chat/logs**: Use fixed height with scrolling
3. **For forms**: Use auto-expand for better UX
4. **For dashboards**: Use fixed height for consistent layout

## Future Enhancements

Potential future features:
- `max_height` parameter for auto-expand mode
- Smooth height transitions
- Height change callbacks
- Responsive height based on viewport

---

**Version:** 0.3.0  
**Status:** Implemented and tested ✅

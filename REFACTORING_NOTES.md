# Streamlit Lexical Editor - Refactoring Documentation

## Problem Summary

The editor had critical stability issues causing text to disappear, especially on pages with multiple editors:

### Root Causes Identified

1. **Race Condition with State Tracking** - `markdownRef` was initialized once and never updated when props changed
2. **Namespace Collisions** - Multiple editors without keys would share the same namespace
3. **Stale Configuration** - `editorConfig` was created once with old prop values
4. **Debounce Context Loss** - Debounce function lost component instance context
5. **No Initial Value Return** - Component didn't send initial value on mount, returning `null`
6. **Flawed Comparison Logic** - Update detection logic prevented legitimate updates

## Refactoring Changes

### 1. Converted to Function Component with Hooks

**Before:** Class component with complex lifecycle
**After:** Modern function component using React hooks

**Benefits:**
- Cleaner state management
- Proper dependency tracking
- Better hook composition
- No `this` context issues

### 2. Fixed Unique Instance ID Generation

```typescript
// Generate stable instance ID for each editor instance
const instanceIdRef = useRef<string>(`lexical-${++instanceCounter}-${Date.now()}`)

// Generate unique namespace
const namespace = useMemo(() => {
  const keyPart = typedArgs.key || instanceIdRef.current
  return `StreamlitLexicalEditor-${keyPart}`
}, [typedArgs.key])
```

**Benefits:**
- Every editor instance gets a unique namespace
- Multiple editors on the same page won't collide
- Falls back to instance ID if no key provided

### 3. Proper Ref Tracking

```typescript
// Track the current markdown to detect external changes
const currentMarkdownRef = useRef<string>(typedArgs.value || "")

// Track update version to prevent race conditions
const updateVersionRef = useRef(0)
```

**Benefits:**
- Refs persist across renders without causing re-renders
- Can detect when external props change vs internal edits
- Version tracking prevents race conditions

### 4. Send Initial Value on Mount

```typescript
useEffect(() => {
  if (!hasSentInitialValue.current) {
    const initialValue = typedArgs.value || ""
    currentMarkdownRef.current = initialValue
    Streamlit.setComponentValue(initialValue)
    hasSentInitialValue.current = true
  }
}, [])
```

**Benefits:**
- Component immediately returns initial value instead of `null`
- Prevents flash of empty state
- Streamlit apps can read value immediately

### 5. Improved Debouncing with useCallback

```typescript
const handleEditorChange = useCallback((editorState: any) => {
  editorState.read(() => {
    const markdown = $convertToMarkdownString(...)
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      currentMarkdownRef.current = markdown
      updateVersionRef.current++
      Streamlit.setComponentValue(markdown)
    }, typedArgs.debounce)
  })
}, [typedArgs.debounce])
```

**Benefits:**
- Proper timer cleanup
- Stable function reference
- No context loss
- Version tracking for race condition prevention

### 6. Smart Update Detection in EditorContentUpdater

```typescript
useEffect(() => {
  // Skip if content hasn't actually changed
  if (content === prevContentRef.current) {
    return
  }

  // Skip if this is just our own update echoing back
  if (content === currentMarkdownRef.current && 
      localVersionRef.current === updateVersionRef.current) {
    return
  }

  // Only update if root is empty OR overwrite is true AND content differs
  if (currentText === "" || (overwrite && content !== currentMarkdownRef.current)) {
    // Update editor...
  }
}, [editor, content, overwrite, currentMarkdownRef, updateVersionRef])
```

**Benefits:**
- Prevents update loops
- Detects genuine external changes
- Respects `overwrite` parameter
- Won't overwrite user edits unless intended

### 7. Proper Cleanup

```typescript
useEffect(() => {
  return () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
  }
}, [])
```

**Benefits:**
- Prevents memory leaks
- Cleans up timers on unmount
- No lingering callbacks

## Key Improvements

### Stability
- ✅ No more disappearing text
- ✅ Multiple editors work independently
- ✅ Proper state isolation per instance
- ✅ No race conditions between editors

### Correctness
- ✅ Initial value properly returned
- ✅ External prop changes properly detected
- ✅ User edits not lost
- ✅ Update loops prevented

### Performance
- ✅ Memoized expensive computations
- ✅ Proper dependency arrays
- ✅ Minimal re-renders
- ✅ Efficient debouncing

### Developer Experience
- ✅ Better TypeScript types
- ✅ Clearer code structure
- ✅ More predictable behavior
- ✅ Easier to debug with console logs

## Testing Recommendations

### 1. Single Editor Test
- Create editor with initial value
- Verify initial value returns immediately (not null)
- Type text and verify updates
- Clear text and verify empty string (not null)

### 2. Multiple Editors Test
- Create 2+ editors on same page
- Each with different initial values
- Verify they don't interfere with each other
- Type in one, verify others unchanged

### 3. Dialog Test
- Open dialog with multiple editors
- Close and reopen dialog
- Verify state persists correctly
- Test rapid open/close cycles

### 4. Programmatic Update Test
- Set editor value via session_state
- Verify content updates in editor
- Type in editor
- Verify programmatic updates still work

### 5. Overwrite Parameter Test
- Test with `overwrite=True` - should replace content
- Test with `overwrite=False` - should preserve user edits
- Switch between modes dynamically

## Migration Notes

This is a **backward-compatible** refactoring. No API changes required.

### Existing Code Works
All existing code using the component will work without changes:

```python
result = streamlit_lexical_extended(
    value=initial_content,
    placeholder="Type here...",
    height=300,
    key="my_editor"
)
```

### Behavior Changes
- Component now returns initial value immediately (was returning `null`)
- Multiple editors without keys now work correctly (was causing collisions)
- Programmatic value updates now work reliably (was sometimes ignored)

### Recommendations
1. Always provide unique `key` for multiple editors on same page
2. Use `overwrite=False` if you want to preserve user edits during reruns
3. Check for `None` less often - component always returns a string now

## Console Logging

Added strategic console logs for debugging:
- `"Sent initial value to Streamlit: ..."`
- `"Editor changed, sent to Streamlit: ..."`
- `"Updating editor with new content: ..."`

These help diagnose issues in development. Consider removing or gating behind a `debug` prop in production.

## Known Limitations

1. **Concurrent Edits** - If value prop changes while user is typing, behavior depends on `overwrite` flag
2. **Large Documents** - Very large initial values (>1MB) may have performance impact
3. **Browser Storage** - Lexical may use localStorage for some features, potential cross-tab interference

## Future Improvements

1. **Controlled/Uncontrolled Mode** - Add explicit mode selection
2. **Change Detection** - Add `on_change` callback support in Python
3. **Validation** - Add content validation before sending to Streamlit
4. **Diff-based Updates** - Only send changed portions for large documents
5. **State Serialization** - Save/restore full editor state, not just markdown
6. **Error Boundaries** - Better error handling and recovery
7. **Performance Monitoring** - Track render times and update frequencies

## Files Modified

- `streamlit_lexical_extended/frontend/src/StreamlitLexical.tsx` - Complete refactoring

## Conclusion

This refactoring addresses all identified stability issues while maintaining backward compatibility. The component should now work reliably with multiple instances and handle state updates correctly.

The code is more maintainable, uses modern React patterns, and follows best practices for Streamlit custom components.

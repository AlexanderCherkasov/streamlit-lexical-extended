# Changelog

All notable changes to streamlit-lexical-extended will be documented in this file.

## [0.3.8] - 2026-07-28

### Changed

- **Python Requirement Bump**: Raised minimum required Python version to `>=3.11` and updated CI workflows to test Python 3.11 and 3.13.
- **Session State Fix**: Resolved `StreamlitAPIException` when instantiating widgets with session state keys.

## [0.3.7] - 2026-07-28

### Fixed

- **Session State Callback Synchronization**: Added callback wrapper in Python API ensuring `st.session_state[key]` and internal state values are updated to `str` before invoking `on_change` callbacks.
- **External Update Precedence**: Refined React `EditorContentUpdater` to ensure non-null external content changes sent from Python are never swallowed by local typing debounce timers.

## [0.3.6] - 2026-07-28

### Changed

- Production release of native Markdown string (`str`) API and echo rerun elimination for `streamlit-lexical-extended`.

## [0.3.5] - 2026-07-28

### Changed

- Updated `streamlit_lexical_extended()` API to return a native Markdown string (`str`) directly instead of a `ComponentResult` object.

### Fixed

- **Rerun Echo Elimination**: Added automatic internal state tracking in `st.session_state` (`_lexical_internal_val_{key}`) to suppress repeated `value` prop updates on Streamlit reruns.
- **Cursor & Focus Stabilization**: Added `isLocalUpdate` flag in React frontend (`StreamlitLexical.tsx`) to prevent Lexical node tree clearing (`$convertFromMarkdownString`) and cursor jumps during active typing.

## [0.3.0] - 2026-07-28

### Changed

- Migrated from iframe-based Custom Components v1 to package-based Streamlit
  Custom Components v2.
- Native `streamlit_lexical_extended()` API returning a Markdown string (`str`) directly.
- Added automatic internal state tracking in `st.session_state` to deduplicate `value` props on Streamlit reruns, preventing echo rerun loops.
- Added `isLocalUpdate` tracking on frontend to eliminate cursor resets and focus loss during active typing.
- Moved Python packaging to `pyproject.toml` and included the component
  manifest and hashed frontend assets in wheels.
- Replaced Create React App with a Vite library build.
- Updated to React 19, Lexical 0.48, TypeScript 7, Vite 8, and
  `@streamlit/component-v2-lib` 0.2.
- Replaced the old Streamlit iframe bridge with the Components v2 mounting
  renderer, named state values, native width, and content/fixed height.
- Updated table actions to stable Lexical APIs and made popovers safe inside
  Streamlit's Shadow DOM.
- Replaced global Bootstrap with a local reset and Streamlit theme variables.

### Added

- Native `width` support for the public API.
- Per-editor `toolbar` configuration with a full default, selected controls,
  or a completely hidden toolbar.
- Automatic RTL inheritance from the parent Streamlit application, including
  logical toolbar spacing, lists, quotes, tables, and table action overlays.
- Explicit argument validation using `TypeError` and `ValueError`.
- Tests for native state, callbacks, update semantics, direct-DOM rendering,
  multiple editors, fixed/automatic height, formatting, tables, and console
  errors.
- A public example with a complete Markdown input/output round trip through
  the native Components v2 API.
- Reproducible `uv.lock`, one-command VS Code tasks and launch profiles,
  GitHub Actions CI, and tokenless PyPI Trusted Publishing.
- Concise contributor and security documentation.

### Fixed

- Prevented React roots from reusing a stale Streamlit mounting placeholder.
- Replaced dynamically highlighted output code blocks in the example with
  stable read-only Markdown fields, avoiding Streamlit's `insertBefore`
  reconciliation error during component reruns.
- Preserved visible line breaks when Markdown is rendered by Streamlit by
  emitting hard-break markers for consecutive plain-text lines while leaving
  lists, tables, quotes, headings, and fenced code blocks unchanged.

### Removed

- `components.v1.declare_component`, development URL selection, `_RELEASE`,
  `streamlit-component-lib`, Create React App, the component iframe, and the
  global Bootstrap stylesheet.
- The legacy string-returning wrapper, its internal state key adapter, the
  redundant `_v2` function suffix, and the `overwrite` option.
- Obsolete v0.2 reports, screenshots, manual test applications, generated test
  results, duplicated development environments, and repository-local secrets.

## [0.2.0] - 2025-10-01

### Fixed
- **Critical:** Fixed text disappearing issue, especially on pages with multiple editors
- **Critical:** Fixed namespace collisions when multiple editors lack unique keys
- **Critical:** Fixed race conditions with state updates
- **Critical:** Fixed component returning `null` instead of initial value on mount
- Fixed stale prop values in editor configuration
- Fixed debounce function losing component context
- Fixed comparison logic that prevented legitimate updates

### Changed
- **Breaking (behavior):** Component now returns initial value immediately instead of `null`
- Converted from class component to function component using React hooks
- Improved state management with proper ref tracking
- Enhanced update detection logic to prevent unnecessary re-renders
- Better memory management with proper cleanup

### Added
- Unique instance ID generation for each editor
- Version tracking to prevent race conditions
- Console logging for debugging (development mode)
- Comprehensive update detection logic

### Technical Details
- Refactored `StreamlitLexical.tsx` from class to function component
- Implemented `useRef`, `useCallback`, `useMemo`, and `useEffect` hooks
- Added proper cleanup for debounce timers
- Improved TypeScript type safety
- Enhanced `EditorContentUpdater` with smart change detection

### Migration Notes
- **Backward compatible:** No API changes required
- Existing code will work without modifications
- Behavior improvement: Component always returns a string (never `null`)
- Recommendation: Always provide unique `key` for multiple editors

## [0.1.6] - Previous Version

Initial version with known stability issues.

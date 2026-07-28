# Changelog

All notable changes to streamlit-lexical-extended will be documented in this file.

## [0.3.0] - 2026-07-28

### Changed

- Migrated from iframe-based Custom Components v1 to package-based Streamlit
  Custom Components v2.
- Replaced the legacy string-returning API with one native
  `streamlit_lexical_extended()` API returning a named `ComponentResult`.
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

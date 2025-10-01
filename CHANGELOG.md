# Changelog

All notable changes to streamlit-lexical-extended will be documented in this file.

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

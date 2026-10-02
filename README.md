# Capja 📸

Privacy-first Chrome extension for screen capture, screen recording, and local media export.

## Status

Technical Spike completed.

Core feasibility has been investigated using Chrome Extension Manifest V3, Chrome APIs, and Web Media APIs.

### Verified

- Manifest V3
- Visible tab capture
- PNG export
- JPEG export
- WebM recording/export
- Offscreen Documents
- Native MediaRecorder
- Video-only MP4 in Chromium test environment

### Partially Verified / Blocked

- Tab recording and tab audio
- Screen recording
- Window recording
- Restricted-page capture
- Animated GIF export
- MP4 with AAC audio

## Principles

- Local-first processing
- No captured-media uploads by default
- Minimum Chrome permissions
- Native browser APIs first
- Avoid unnecessary dependencies
- No backend unless explicitly required

## Development

Capja is being developed as a Manifest V3 Chrome extension.

Architecture and implementation decisions are based on documented Chrome API behavior and browser testing.

## License

License has not been selected yet.

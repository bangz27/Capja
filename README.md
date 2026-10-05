# Capja

Privacy-first Chrome extension for visible-tab capture and local media export.

## Status

V1 approved and implemented: visible-tab screenshot, selected-area crop, PNG, JPEG, local download.

Not in V1: tab recording, screen/window recording, GIF, MP4, audio, upload, backend.

## V1 permissions

- `activeTab` only. Granted when the user clicks the Capja action.
- No `<all_urls>`, `tabCapture`, or `desktopCapture`.
- No always-on content script. Area selection is a temporary overlay on the captured image in an extension page.

## Use

1. Load this folder as an unpacked extension.
2. Click the Capja action on the tab you want.
3. Capture the visible tab, or select an area on the capture.
4. The PNG or JPEG downloads locally. Capja does not upload it.

## Principles

- Local-first processing
- No captured-media uploads by default
- Minimum Chrome permissions
- Native browser APIs first
- Avoid unnecessary dependencies
- No backend unless explicitly required

## License

License has not been selected yet.

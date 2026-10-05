const state = {
  capture: null
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!message || typeof message.type !== "string") {
    return;
  }
  if (message.type === "store-capture") {
    state.capture = message.payload || null;
    sendResponse({ ok: true });
    return;
  }
  if (message.type === "get-capture") {
    sendResponse({ ok: Boolean(state.capture), payload: state.capture });
    return;
  }
  if (message.type === "clear-capture") {
    state.capture = null;
    sendResponse({ ok: true });
  }
});

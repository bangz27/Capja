const formatInput = document.querySelector("#format");
const qualityInput = document.querySelector("#quality");
const qualityLabel = document.querySelector("#quality-label");
const statusNode = document.querySelector("#status");

function settings() {
  return {
    format: formatInput.value === "jpeg" ? "jpeg" : "png",
    quality: Number(qualityInput.value)
  };
}

function setStatus(text) {
  statusNode.textContent = text;
}

function syncQuality() {
  qualityLabel.hidden = settings().format !== "jpeg";
}

async function captureVisibleTab() {
  return chrome.tabs.captureVisibleTab({ format: "png" });
}

document.querySelector("#visible").addEventListener("click", async () => {
  const chosen = settings();
  setStatus("Capturing\u2026");
  try {
    const dataUrl = await captureVisibleTab();
    const image = await capjaLoadImage(dataUrl);
    const exported = capjaCrop(
      image,
      { x: 0, y: 0, width: image.naturalWidth, height: image.naturalHeight },
      chosen.format,
      chosen.quality
    );
    capjaDownload(exported, capjaFilename(chosen.format === "jpeg" ? "jpg" : "png"));
    setStatus("Saved locally.");
  } catch (error) {
    setStatus(error && error.message ? error.message : "Capture failed.");
  }
});

document.querySelector("#area").addEventListener("click", async () => {
  const chosen = settings();
  setStatus("Capturing\u2026");
  try {
    const dataUrl = await captureVisibleTab();
    await chrome.runtime.sendMessage({
      type: "store-capture",
      payload: {
        dataUrl,
        format: chosen.format,
        quality: chosen.quality
      }
    });
    await chrome.tabs.create({ url: chrome.runtime.getURL("src/editor.html") });
    window.close();
  } catch (error) {
    setStatus(error && error.message ? error.message : "Capture failed.");
  }
});

formatInput.addEventListener("change", syncQuality);
syncQuality();

const imageNode = document.querySelector("#capture");
const stage = document.querySelector("#stage");
const selectionNode = document.querySelector("#selection");
const saveButton = document.querySelector("#save");
const statusNode = document.querySelector("#status");

const selection = {
  active: false,
  startX: 0,
  startY: 0,
  box: null
};

let capture = null;

function setStatus(text) {
  statusNode.textContent = text;
}

function displayBox(event) {
  const bounds = imageNode.getBoundingClientRect();
  const x = Math.min(Math.max(event.clientX, bounds.left), bounds.right);
  const y = Math.min(Math.max(event.clientY, bounds.top), bounds.bottom);
  return {
    x: x - bounds.left,
    y: y - bounds.top
  };
}

function paint(box) {
  selectionNode.hidden = false;
  selectionNode.style.left = box.x + "px";
  selectionNode.style.top = box.y + "px";
  selectionNode.style.width = box.width + "px";
  selectionNode.style.height = box.height + "px";
}

function toImageRect(box) {
  const scaleX = imageNode.naturalWidth / imageNode.clientWidth;
  const scaleY = imageNode.naturalHeight / imageNode.clientHeight;
  return {
    x: box.x * scaleX,
    y: box.y * scaleY,
    width: box.width * scaleX,
    height: box.height * scaleY
  };
}

stage.addEventListener("pointerdown", (event) => {
  if (!capture) {
    return;
  }
  const point = displayBox(event);
  selection.active = true;
  selection.startX = point.x;
  selection.startY = point.y;
  selection.box = { x: point.x, y: point.y, width: 0, height: 0 };
  stage.setPointerCapture(event.pointerId);
  paint(selection.box);
  saveButton.disabled = true;
});

stage.addEventListener("pointermove", (event) => {
  if (!selection.active) {
    return;
  }
  const point = displayBox(event);
  selection.box = {
    x: Math.min(selection.startX, point.x),
    y: Math.min(selection.startY, point.y),
    width: Math.abs(point.x - selection.startX),
    height: Math.abs(point.y - selection.startY)
  };
  paint(selection.box);
});

stage.addEventListener("pointerup", () => {
  selection.active = false;
  const usable = selection.box && selection.box.width >= 2 && selection.box.height >= 2;
  saveButton.disabled = !usable;
  setStatus(usable ? "Save the selection, or drag again." : "Drag a larger area.");
});

saveButton.addEventListener("click", async () => {
  const image = await capjaLoadImage(capture.dataUrl);
  const exported = capjaCrop(
    image,
    toImageRect(selection.box),
    capture.format,
    capture.quality
  );
  const extension = capture.format === "jpeg" ? "jpg" : "png";
  capjaDownload(exported, capjaFilename(extension));
  await chrome.runtime.sendMessage({ type: "clear-capture" });
  setStatus("Saved locally.");
});

document.querySelector("#cancel").addEventListener("click", async () => {
  await chrome.runtime.sendMessage({ type: "clear-capture" });
  window.close();
});

chrome.runtime.sendMessage({ type: "get-capture" }, (response) => {
  if (!response || !response.ok || !response.payload) {
    setStatus("No capture is waiting. Use the Capja popup again.");
    return;
  }
  capture = response.payload;
  imageNode.src = capture.dataUrl;
  setStatus("Drag to select an area.");
});

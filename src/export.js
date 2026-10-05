function capjaFilename(extension) {
  const now = new Date();
  const part = (value) => String(value).padStart(2, "0");
  return [
    "capja-",
    now.getFullYear(),
    part(now.getMonth() + 1),
    part(now.getDate()),
    "-",
    part(now.getHours()),
    part(now.getMinutes()),
    part(now.getSeconds()),
    ".",
    extension
  ].join("");
}

function capjaDownload(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function capjaCrop(image, rect, format, quality) {
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(
    image,
    rect.x,
    rect.y,
    rect.width,
    rect.height,
    0,
    0,
    width,
    height
  );
  if (format === "jpeg") {
    return canvas.toDataURL("image/jpeg", quality);
  }
  return canvas.toDataURL("image/png");
}

function capjaLoadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not read the capture."));
    image.src = dataUrl;
  });
}

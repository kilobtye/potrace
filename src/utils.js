import Bitmap from './Bitmap.js';

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

export function createBitmap(canvas) {
  const { width, height } = canvas;
  const imageData = canvas.getContext('2d').getImageData(0, 0, width, height);
  const bitmap = new Bitmap(width, height);

  let imageDataIndex = 0;
  const length = width * height;
  for (let bitmapIndex = 0; bitmapIndex < length; bitmapIndex ++) {
    const r = 0.2126 * imageData.data[imageDataIndex ++];
    const g = 0.7153 * imageData.data[imageDataIndex ++];
    const b = 0.0721 * imageData.data[imageDataIndex ++];
    const a = imageDataIndex ++; // alpha
    const color = r + g + b;

    bitmap.data[bitmapIndex] = (color < 128 ? 1 : 0);
  }

  return bitmap;
}

export function sign(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}

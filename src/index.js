import { loadImage, createBitmap } from './utils.js';
import bitmapToPathList from './bitmapToPathList.js';
import processPath from './processPath.js';
import getSVG from './getSVG.js';

const OPTIONS = {
  turnpolicy: 'right',
  turdsize: 2,
  optcurve: true,
  alphamax: 1,
  opttolerance: 0.2
};

export function traceFile(file, options) {
  return traceUrl(URL.createObjectURL(file), options);
}

export async function traceUrl(url, options) {
  const image = await loadImage(url, options);

  return traceImage(image, options);
}

export function traceImage(image, options) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  return traceCanvas(canvas, options);
}

export function traceCanvas(canvas, options = {}) {
  options = { ...options, ...OPTIONS };

  const bitmap = createBitmap(canvas);
  const pathList = bitmapToPathList(bitmap, options);
  processPath(pathList, options);

  return pathList;
}

export { getSVG };

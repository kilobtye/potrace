import { loadImage, createBitmap } from './utils.js';
import bitmapToPathList from './bitmapToPathList.js';
import processPath from './processPath.js';
import getSVG from './getSVG.js';
import getPaths from './getPaths.js';
import Bitmap from './Bitmap.js';

const OPTIONS = {
  turnpolicy: 'right',
  turdsize: 2,
  optcurve: true,
  alphamax: 1,
  opttolerance: 0.2
};

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

export function traceCanvas(canvas, options) {
  const bitmap = createBitmap(canvas);

  return traceBitmap(bitmap, options);
}

export function traceBitmap(bitmap, options = OPTIONS) {
  const pathList = bitmapToPathList(bitmap, options);
  processPath(pathList, options);

  return pathList;
}

export { getSVG, getPaths, Bitmap };

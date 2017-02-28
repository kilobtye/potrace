import Bitmap from './Bitmap.js';

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

export function createBitmap(imgCanvas) {
  var ctx = imgCanvas.getContext('2d');
  var bm = new Bitmap(imgCanvas.width, imgCanvas.height);
  var imgdataobj = ctx.getImageData(0, 0, bm.w, bm.h);
  var l = imgdataobj.data.length, i, j, color;

  let zero = 0;
  let one = 0;

  for (i = 0, j = 0; i < l; i += 4, j++) {
    color = 0.2126 * imgdataobj.data[i] + 0.7153 * imgdataobj.data[i + 1] +
        0.0721 * imgdataobj.data[i + 2];
    bm.data[j] = (color < 128 ? 1 : 0);

    if (color < 128) {
      one ++;
    } else {
      zero ++;
    }
  }

  return bm;
}

export function mod(a, n) {
  if (a >= n) {
    return a % n;
  } else if (a >= 0) {
    return a;
  } else {
    return n - 1 - (-1 - a) % n;
  }
}

export function sign(i) {
  if (i > 0) {
    return 1;
  } else if (i < 0) {
    return -1;
  } else {
    return 0;
  }
}

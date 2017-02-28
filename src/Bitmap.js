import Point from './Point.js';

export default class Bitmap {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.size = width * height;
    this.data = new Int8Array(this.size);
  }

  at(x, y) {
    return (x >= 0 && x < this.width && y >=0 && y < this.height) &&
        this.data[this.width * y + x] === 1;
  }

  flip(x, y) {
    if (this.at(x, y)) {
      this.data[this.width * y + x] = 0;
    } else {
      this.data[this.width * y + x] = 1;
    }
  }

  copy() {
    var bm = new Bitmap(this.width, this.height), i;
    for (i = 0; i < this.size; i++) {
      bm.data[i] = this.data[i];
    }
    return bm;
  }

  index(i) {
    const x = i % this.width;
    const y = Math.floor(i / this.width);
    return new Point(x, y);
  }

  xOrPath(path) {
    var y1 = path.pt[0].y,
      len = path.len,
      x, y, maxX, minY, i, j;
    for (i = 1; i < len; i++) {
      x = path.pt[i].x;
      y = path.pt[i].y;

      if (y !== y1) {
        minY = y1 < y ? y1 : y;
        maxX = path.maxX;
        for (j = x; j < maxX; j++) {
          this.flip(j, minY);
        }
        y1 = y;
      }
    }
  }
}

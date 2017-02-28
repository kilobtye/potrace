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
    const bitmap = new Bitmap(this.width, this.height);
    for (let i = 0; i < this.size; i ++) {
      bitmap.data[i] = this.data[i];
    }
    return bitmap;
  }

  index(i) {
    const x = i % this.width;
    const y = Math.floor(i / this.width);
    return new Point(x, y);
  }

  xOrPath(path) {
    let y1 = path.points[0].y;

    for (let i = 1; i < path.length; i ++) {
      const x = path.points[i].x;
      const y = path.points[i].y;

      if (y !== y1) {
        const minY = Math.min(y1, y);
        const maxX = path.maxX;
        for (let j = x; j < maxX; j ++) {
          this.flip(j, minY);
        }
        y1 = y;
      }
    }
  }
}

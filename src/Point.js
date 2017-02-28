export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  copy() {
    return new Point(this.x, this.y);
  }
  toIndex(width, height) {
    if (this.x < 0 || this.y < 0 || this.x >= width || this.y >= height) return null;
    return width * this.y + this.x;
  }
}

import { sign } from './utils';

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
  lerp(point, lambda) {
    const x = this.x + lambda * (point.x - this.x);
    const y = this.y + lambda * (point.y - this.y);

    return new Point(x, y);
  }
  dorthInfty(point) {
    const x = -sign(point.y - this.y);
    const y = sign(point.x - this.x);

    return new Point(x, y);
  }
  ddenom(point) {
    const r = this.dorthInfty(point);

    return r.y * (point.x - this.x) - r.x * (point.y - this.y);
  }
}

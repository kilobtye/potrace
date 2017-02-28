export default class Path {
  constructor() {
    this.area = 0;
    this.len = 0;
    this.curve = {};
    this.pt = [];
    this.minX = 100000;
    this.minY = 100000;
    this.maxX= -1;
    this.maxY = -1;
  }
}

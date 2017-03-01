export default class Quad {
  constructor() {
    this.data = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ];
  }
  at(x, y) {
    return this.data[x * 3 + y];
  };
}

export default class Path {
  constructor(points, area, isHole) {
    this.points = points;
    this.area = area;
    this.isHole = isHole;

    const xValues = this.points.map(({ x }) => x);
    const yValues = this.points.map(({ y }) => y);

    this.minX = Math.min(...xValues);
    this.minY = Math.min(...yValues);
    this.maxX = Math.max(...xValues);
    this.maxY = Math.max(...yValues);

    this.curve = {};
  }
}

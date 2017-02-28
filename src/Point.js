function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.copy = function(){
  return new Point(this.x, this.y);
};

export default Point;

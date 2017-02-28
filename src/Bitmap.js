import Point from './Point.js';

function Bitmap(w, h) {
  this.w = w;
  this.h = h;
  this.size = w * h;
  this.arraybuffer = new ArrayBuffer(this.size);
  this.data = new Int8Array(this.arraybuffer);
}

Bitmap.prototype.at = function (x, y) {
  return (x >= 0 && x < this.w && y >=0 && y < this.h) &&
      this.data[this.w * y + x] === 1;
};

Bitmap.prototype.index = function(i) {
  var point = new Point();
  point.y = Math.floor(i / this.w);
  point.x = i - point.y * this.w;
  return point;
};

Bitmap.prototype.flip = function(x, y) {
  if (this.at(x, y)) {
    this.data[this.w * y + x] = 0;
  } else {
    this.data[this.w * y + x] = 1;
  }
};

Bitmap.prototype.copy = function() {
  var bm = new Bitmap(this.w, this.h), i;
  for (i = 0; i < this.size; i++) {
    bm.data[i] = this.data[i];
  }
  return bm;
};

export default Bitmap;

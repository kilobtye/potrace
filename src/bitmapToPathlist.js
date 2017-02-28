import Path from './Path.js';
import Point from './Point.js';

function findNext(point, bitmapTarget) {
  let i = bitmapTarget.width * point.y + point.x;
  while (i < bitmapTarget.size && bitmapTarget.data[i] !== 1) {
    i ++;
  }
  return i < bitmapTarget.size && bitmapTarget.index(i);
}

function findPath(point, bitmap, bitmapTarget, info) {
  var path = new Path(),
    x = point.x, y = point.y,
    dirx = 0, diry = 1, tmp;

  path.sign = bitmap.at(point.x, point.y) ? "+" : "-";

  while (true) {
    path.pt.push(new Point(x, y));
    if (x > path.maxX)
      path.maxX = x;
    if (x < path.minX)
      path.minX = x;
    if (y > path.maxY)
      path.maxY = y;
    if (y < path.minY)
      path.minY = y;
    path.len++;

    x += dirx;
    y += diry;
    path.area -= x * diry;

    if (x === point.x && y === point.y)
      break;

    var l = bitmapTarget.at(x + (dirx + diry - 1 ) / 2, y + (diry - dirx - 1) / 2);
    var r = bitmapTarget.at(x + (dirx - diry - 1) / 2, y + (diry + dirx - 1) / 2);

    if (r && !l) {
      if (info.turnpolicy === "right" ||
      (info.turnpolicy === "black" && path.sign === '+') ||
      (info.turnpolicy === "white" && path.sign === '-') ||
      (info.turnpolicy === "majority" && majority(x, y, bitmapTarget)) ||
      (info.turnpolicy === "minority" && !majority(x, y, bitmapTarget))) {
        tmp = dirx;
        dirx = -diry;
        diry = tmp;
      } else {
        tmp = dirx;
        dirx = diry;
        diry = -tmp;
      }
    } else if (r) {
      tmp = dirx;
      dirx = -diry;
      diry = tmp;
    } else if (!l) {
      tmp = dirx;
      dirx = diry;
      diry = -tmp;
    }
  }
  return path;
}

function majority(x, y, bitmapTarget) {
  var i, a, ct;
  for (i = 2; i < 5; i++) {
    ct = 0;
    for (a = -i + 1; a <= i - 1; a++) {
      ct += bitmapTarget.at(x + a, y + i - 1) ? 1 : -1;
      ct += bitmapTarget.at(x + i - 1, y + a - 1) ? 1 : -1;
      ct += bitmapTarget.at(x + a - 1, y - i) ? 1 : -1;
      ct += bitmapTarget.at(x - i, y + a) ? 1 : -1;
    }
    if (ct > 0) {
      return 1;
    } else if (ct < 0) {
      return 0;
    }
  }
  return 0;
}

export default function bitmapToPathlist(bitmap, options) {
  const bitmapTarget = bitmap.copy();
  const pathlist = [];

  let currentPoint = new Point(0, 0);
  while (currentPoint = findNext(currentPoint, bitmapTarget)) {
    const path = findPath(currentPoint, bitmap, bitmapTarget, options);
    bitmapTarget.xOrPath(path);
    if (path.area > options.turdsize) pathlist.push(path);
  }

  return pathlist;
}

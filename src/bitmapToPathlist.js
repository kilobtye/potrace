import Path from './Path.js';
import Point from './Point.js';

function bmToPathlist(bm, info) {

  var bm1 = bm.copy(),
    currentPoint = new Point(0, 0),
    path;

  function findNext(point) {
    var i = bm1.w * point.y + point.x;
    while (i < bm1.size && bm1.data[i] !== 1) {
      i++;
    }
    return i < bm1.size && bm1.index(i);
  }

  function majority(x, y) {
    var i, a, ct;
    for (i = 2; i < 5; i++) {
      ct = 0;
      for (a = -i + 1; a <= i - 1; a++) {
        ct += bm1.at(x + a, y + i - 1) ? 1 : -1;
        ct += bm1.at(x + i - 1, y + a - 1) ? 1 : -1;
        ct += bm1.at(x + a - 1, y - i) ? 1 : -1;
        ct += bm1.at(x - i, y + a) ? 1 : -1;
      }
      if (ct > 0) {
        return 1;
      } else if (ct < 0) {
        return 0;
      }
    }
    return 0;
  }

  function findPath(point) {
    var path = new Path(),
      x = point.x, y = point.y,
      dirx = 0, diry = 1, tmp;

    path.sign = bm.at(point.x, point.y) ? "+" : "-";

    while (1) {
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

      var l = bm1.at(x + (dirx + diry - 1 ) / 2, y + (diry - dirx - 1) / 2);
      var r = bm1.at(x + (dirx - diry - 1) / 2, y + (diry + dirx - 1) / 2);

      if (r && !l) {
        if (info.turnpolicy === "right" ||
        (info.turnpolicy === "black" && path.sign === '+') ||
        (info.turnpolicy === "white" && path.sign === '-') ||
        (info.turnpolicy === "majority" && majority(x, y)) ||
        (info.turnpolicy === "minority" && !majority(x, y))) {
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

  function xorPath(path){
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
          bm1.flip(j, minY);
        }
        y1 = y;
      }
    }

  }

  const pathlist = [];

  while (currentPoint = findNext(currentPoint)) {

    path = findPath(currentPoint);

    xorPath(path);

    if (path.area > info.turdsize) {
      pathlist.push(path);
    }
  }

  return pathlist;

}

export default bmToPathlist;

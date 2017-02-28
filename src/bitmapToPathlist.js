import Path from './Path.js';
import Point from './Point.js';

export default function bitmapToPathlist(bitmap, options) {
  const bitmapTarget = bitmap.copy();
  const pathlist = [];

  for (let point = findNext(new Point(0, 0), bitmapTarget); point; point = findNext(point, bitmapTarget)) {
    const path = findPath(point, bitmap, bitmapTarget, options);
    if (path.area > options.turdsize) pathlist.push(path);

    bitmapTarget.xOrPath(path);
  }

  return pathlist;
}

function findNext(point, bitmapTarget) {
  for (let i = point.toIndex(bitmapTarget.width, bitmapTarget.height); i < bitmapTarget.size; i ++) {
    if (bitmapTarget.data[i]) return bitmapTarget.index(i);
  }
  return false;
}

function findPath(point, bitmap, bitmapTarget, info) {
  const path = new Path();

  let { x, y } = point;

  let dirX = 0;
  let dirY = 1;

  path.sign = bitmap.at(x, y) ? '+' : '-';

  while (true) {
    path.points.push(new Point(x, y));
    if (x > path.maxX) path.maxX = x;
    if (x < path.minX) path.minX = x;
    if (y > path.maxY) path.maxY = y;
    if (y < path.minY) path.minY = y;

    x += dirX;
    y += dirY;
    path.area -= x * dirY;

    if (x === point.x && y === point.y) break;

    const left = bitmapTarget.at(x + (dirX + dirY - 1 ) / 2, y + (dirY - dirX - 1) / 2);
    const right = bitmapTarget.at(x + (dirX - dirY - 1) / 2, y + (dirY + dirX - 1) / 2);

    if (right && !left) {
      if (turn(info.turnpolicy, path, bitmapTarget, x, y)) {
        const tmp = dirX;
        dirX = -dirY;
        dirY = tmp;
      } else {
        const tmp = dirX;
        dirX = dirY;
        dirY = -tmp;
      }
    } else if (right) {
      const tmp = dirX;
      dirX = -dirY;
      dirY = tmp;
    } else if (!left) {
      const tmp = dirX;
      dirX = dirY;
      dirY = -tmp;
    }
  }

  return path;
}

function turn(turnpolicy, path, bitmap, x, y) {
  switch (turnpolicy) {
    case 'right':
      return true;

    case 'black':
      return path.sign === '+';

    case 'white':
      return path.sign === '-';

    case 'majority':
      return majority(x, y, bitmap);

    case 'minority':
      return !majority(x, y, bitmap);

    default:
      return true;
  }
}

function majority(x, y, bitmap) {
  for (let i = 2; i < 5; i ++) {
    let ct = 0;
    for (let a = -i + 1; a <= i - 1; a ++) {
      ct += bitmap.at(x + a, y + i - 1) ? 1 : -1;
      ct += bitmap.at(x + i - 1, y + a - 1) ? 1 : -1;
      ct += bitmap.at(x + a - 1, y - i) ? 1 : -1;
      ct += bitmap.at(x - i, y + a) ? 1 : -1;
    }

    if (ct > 0) {
      return true;
    } else if (ct < 0) {
      return false;
    }
  }
  return false;
}

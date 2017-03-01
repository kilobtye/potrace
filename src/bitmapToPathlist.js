import Path from './Path.js';
import Point from './Point.js';

export default function bitmapToPathList(bitmap, options) {
  const bitmapTarget = bitmap.copy();
  const pathList = [];

  for (let point = findNext(new Point(0, 0), bitmapTarget); point; point = findNext(point, bitmapTarget)) {
    const path = findPath(point, bitmap, bitmapTarget, options);
    if (path.area > options.turdsize) pathList.push(path);

    bitmapTarget.xOrPath(path);
  }

  return pathList;
}

function findNext(point, bitmapTarget) {
  for (let i = point.toIndex(bitmapTarget.width, bitmapTarget.height); i < bitmapTarget.size; i ++) {
    if (bitmapTarget.data[i]) return bitmapTarget.index(i);
  }
  return false;
}

function findPath(point, bitmap, bitmapTarget, options) {
  let { x, y } = point;
  let dirX = 0;
  let dirY = 1;

  const points = [];
  let area = 0;
  const isHole = !bitmap.at(x, y);

  while (true) {
    points.push(new Point(x, y));

    x += dirX;
    y += dirY;
    area -= x * dirY;

    if (x === point.x && y === point.y) break;

    const left = bitmapTarget.at(x + (dirX + dirY - 1 ) / 2, y + (dirY - dirX - 1) / 2);
    const right = bitmapTarget.at(x + (dirX - dirY - 1) / 2, y + (dirY + dirX - 1) / 2);

    if (right && !left) {
      if (turn(options.turnpolicy, isHole, bitmapTarget, x, y)) {
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

  return new Path(points, area, isHole);
}

function turn(turnpolicy, isHole, bitmap, x, y) {
  switch (turnpolicy) {
    case 'right':
      return true;

    case 'black':
      return !isHole;

    case 'white':
      return isHole;

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

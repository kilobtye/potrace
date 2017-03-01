export default function getPaths(pathlist) {

  function path(curve) {
    function bezier(i) {
      var x1 = curve.c[i * 3 + 0].x;
      var y1 = curve.c[i * 3 + 0].y;
      var x2 = curve.c[i * 3 + 1].x;
      var y2 = curve.c[i * 3 + 1].y;
      var x = curve.c[i * 3 + 2].x;
      var y = curve.c[i * 3 + 2].y;

      return {
        type: "CURVE",
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x: x,
        y: y,
      }
    }

    function segment(i) {
      var x1 = curve.c[i * 3 + 1].x;
      var y1 = curve.c[i * 3 + 1].y;
      var x2 = curve.c[i * 3 + 2].x;
      var y2 = curve.c[i * 3 + 2].y;

      return [
        {
          type: "POINT",
          x: x1,
          y: y1
        }, {
          type: "POINT",
          x: x2,
          y: y2
        }
      ];
    }
    var p = [];

    var n = curve.n, i, s;

    var x = curve.c[(n - 1) * 3 + 2].x;
    var y = curve.c[(n - 1) * 3 + 2].y;

    p.push({
      type: "POINT",
      x: x,
      y: y
    });

    for (i = 0; i < n; i++) {
      if (curve.tag[i] === "CURVE") {
        p.push(bezier(i));
      } else if (curve.tag[i] === "CORNER") {
        s = segment(i);
        p.push(s[0], s[1]);
      }
    }
    //p +=
    return p;
  }

  var len = pathlist.length, c, i;

  var paths = [];
  for (i = 0; i < len; i++) {
    c = pathlist[i].curve;
    paths.push(path(c));
  }

  return paths;
}

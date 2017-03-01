function getSVG(pathList, size, opt_type) {

  function path(curve) {

    function bezier(i) {
      var b = 'C ' + (curve.c[i * 3 + 0].x * size).toFixed(3) + ' ' +
          (curve.c[i * 3 + 0].y * size).toFixed(3) + ',';
      b += (curve.c[i * 3 + 1].x * size).toFixed(3) + ' ' +
          (curve.c[i * 3 + 1].y * size).toFixed(3) + ',';
      b += (curve.c[i * 3 + 2].x * size).toFixed(3) + ' ' +
          (curve.c[i * 3 + 2].y * size).toFixed(3) + ' ';
      return b;
    }

    function segment(i) {
      var s = 'L ' + (curve.c[i * 3 + 1].x * size).toFixed(3) + ' ' +
          (curve.c[i * 3 + 1].y * size).toFixed(3) + ' ';
      s += (curve.c[i * 3 + 2].x * size).toFixed(3) + ' ' +
          (curve.c[i * 3 + 2].y * size).toFixed(3) + ' ';
      return s;
    }

    var n = curve.n, i;
    var p = 'M' + (curve.c[(n - 1) * 3 + 2].x * size).toFixed(3) +
        ' ' + (curve.c[(n - 1) * 3 + 2].y * size).toFixed(3) + ' ';
    for (i = 0; i < n; i++) {
      if (curve.tag[i] === "CURVE") {
        p += bezier(i);
      } else if (curve.tag[i] === "CORNER") {
        p += segment(i);
      }
    }
    //p +=
    return p;
  }

  var w = 846, h = 352,
    len = pathList.length, c, i, strokec, fillc, fillrule;

  var svg = '<svg id="svg" version="1.1" width="' + w + '" height="' + h +
      '" xmlns="http://www.w3.org/2000/svg">';
  svg += '<path d="';
  for (i = 0; i < len; i++) {
    c = pathList[i].curve;
    svg += path(c);
  }
  if (opt_type === "curve") {
    strokec = "black";
    fillc = "none";
    fillrule = '';
  } else {
    strokec = "none";
    fillc = "black";
    fillrule = ' fill-rule="evenodd"';
  }
  svg += '" stroke="' + strokec + '" fill="' + fillc + '"' + fillrule + '/></svg>';
  return svg;
}

export default getSVG;

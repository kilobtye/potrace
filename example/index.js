import * as POTRACE from 'src/index.js';

POTRACE.traceUrl('test.png')
  .then(paths => POTRACE.getSVG(paths, 1.0, 'curve'))
  .then(svg => document.write(svg));

# POTRACE
Based on http://potrace.sourceforge.net and https://github.com/kilobtye/potrace.

Converts bitmap images to vector paths.

# Usage

### Using JSPM (ECMAScript / ES6 Module)

Install the library.

```
jspm install POTRACE=github:casperlamboo/POTRACE
```

Include the library.

```javascript
import POTRACE from 'POTRACE';
```

### Using NPM (CommonJS module)

Install the library.

```
npm install potrace-js
```

Include the library.

```javascript
var POTRACE = require('potrace-js');
```

# API

**Options**

```javascript
{
  turnpolicy: enum('black' | 'white' | 'left' | 'right' | 'minority' | 'majority'),
  turdsize: Float,
  optcurve: Bool,
  alphamax: Float,
  opttolerance: Float
}
```
  - turnpolicy: how to resolve ambiguities in path decomposition. (default: "minority")       
  - turdsize: suppress speckles of up to this size (default: 2)
  - optcurve: turn on/off curve optimization (default: true)
  - alphamax: corner threshold parameter (default: 1)
  - opttolerance: curve optimization tolerance (default: 0.2)

**POTRACE.traceUrl**

Traces a given image from url.

```javascript
[...Path] = async POTRACE.traceUrl(url: String, [ options: Object ])
```
  - url: path to the image
  - options: trace options

**POTRACE.traceImage**

Traces a given image.

```javascript
[...Path] = POTRACE.traceImage(image: HTMLImageElement, [ options: Object ])
```
  - image: image containing the image
  - options: trace options

**POTRACE.traceCanvas**

Traces a given canvas.

```javascript
[...Path] = POTRACE.traceCanvas(canvas: HTMLCanvasElement, [ options: Object ])
```
  - canvas: canvas containing the image
  - options: trace options

**POTRACE.getSVG**

Converts trace result to svg.

```javascript
svg: String = POTRACE.getSVG([...Path])
```

**POTRACE.getPaths**

Converts trace result to readable paths.

```javascript
svg: String = POTRACE.getPaths([...Path])
```

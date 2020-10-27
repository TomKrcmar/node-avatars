# node-avatars
Generate avatar images of various types with zero dependencies

## Building

Install dev dependencies
```
npm install
```

Run in dev mode to continuously build sourcemapped files
```
npm run dev
```

Run in prod mode to build minified files
```
npm run prod
```

## Usage
Install:
```
npm install node-avatars --save
```

Different types of avatar generators are exported separately.

Currently, the 8-bit style pixellated generator is supported, but all future generators will follow the same interface:

### Any Platform
```js
import { Pixel } from 'node-avatars';

const seed = 'Hello, World!';

// Uint8Array containing RGBA data for a 5x5 avatar:
const buffer1 = Pixel.generate(seed, 5, 5, {});

// Shorthand for above:
const buffer2 = Pixel.generate(seed, 5);
```

### Browsers
```js
import { Pixel } from 'node-avatars';

const seed = 'Hello, World!';

// Base64-encoded data URL string usable with <img src="..." />:
const dataUrl = Pixel.dataUrl(seed, 5);

// HTMLImageElement object which you can append to containers:
const htmlImageElement = Pixel.createImage(seed, 5);

// Or, you can bring your own image element:
Pixel.applyToImage(seed, 5, 5, {}, document.getElementById('my-image'));
```

### React
Wrap the framework with a simple React component:
```js
import React from 'react';
import { Pixel } from 'node-avatars';

export default function Avatar(props) {
  const { seed, width, height, options } = props;
  return <img src={Pixel.dataUrl(seed, width, height, options)} />;
}
```
Then use it in your app!
```js
<Avatar seed={'Hello, World!'} width={5} height={5} />
```

# jsqrcode

**Powerful JavaScript QR Code Decoder for the Web**

[![NPM Version](https://img.shields.io/npm/v/jsqrcode.svg)](https://www.npmjs.com/package/jsqrcode)
[![License](https://img.shields.io/github/license/Tirthaboss/jsqrcode)](https://github.com/Tirthaboss/jsqrcode/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Tirthaboss/jsqrcode)](https://github.com/Tirthaboss/jsqrcode/stargazers)

**jsqrcode** is a lightweight and fast JavaScript QR code reader that works directly in the browser. It allows you to decode QR codes from image files or video streams using pure JavaScript—no server-side processing or external dependencies required!

---

## Features

- **Zero dependencies** – No bloated libraries
- **Browser-ready** – Works with modern HTML5 APIs
- **Supports image and video input** – Decode from canvas, webcam, or images
- **Fast & efficient** – Lightweight implementation of QR code parsing
- **Open source** – MIT licensed and actively maintained

---

## Demo

Try the live demo here: [jsqrcode Demo](https://tirthaboss.github.io/jsqrcode/)

---

## Installation

Install from NPM:

```bash
npm install jsqrcode
```

Or use it via CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/Tirthaboss/jsqrcode@latest/src/qr_packed.js"></script>
```

---

## Usage

### Decode QR code from image:

```javascript
import { decodeImage } from 'jsqrcode';

const image = document.getElementById('qr-image');
decodeImage(image)
  .then(result => console.log("Decoded QR:", result))
  .catch(err => console.error("Failed to decode:", err));
```

### Decode from webcam:

```javascript
import { decodeFromCamera } from 'jsqrcode';

decodeFromCamera(videoElement, result => {
  console.log("Scanned QR Code:", result);
});
```

> **Note:** The webcam feature requires HTTPS and browser permission to access the camera.

---

## API

### `decodeImage(imageElement: HTMLImageElement): Promise<string>`
Decodes a QR code from a given `<img>` element.

### `decodeFromCanvas(canvas: HTMLCanvasElement): string | null`
Decodes a QR code from a canvas element.

### `decodeFromCamera(videoElement: HTMLVideoElement, callback: (result: string) => void): void`
Continuously scans from a live camera feed and triggers the callback when a QR code is detected.

---

## Browser Compatibility

Tested and supported on:

- Chrome
- Firefox
- Edge
- Safari
- Opera

---

## Contributing

We welcome contributions! Feel free to fork the repo, submit issues, or make pull requests.

```bash
git clone https://github.com/Tirthaboss/jsqrcode.git
npm install
npm run dev
```

---

## License

MIT License  
© [Tirthaboss](https://github.com/Tirthaboss)

---

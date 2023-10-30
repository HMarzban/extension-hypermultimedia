# HyperMultimedia

[![Version](https://img.shields.io/npm/v/@docs.plus/extension-hypermultimedia.svg?label=version)](https://www.npmjs.com/package/@docs.plus/extension-hypermultimedia)
[![Downloads](https://img.shields.io/npm/dm/@docs.plus/extension-hypermultimedia.svg)](https://npmcharts.com/compare/@docs.plus/extension-hypermultimedia)
[![License](https://img.shields.io/npm/l/@docs.plus/extension-hypermultimedia.svg)](https://www.npmjs.com/package/@docs.plus/extension-hypermultimedia)

`extension-hypermultimedia` is a powerful extension for the TipTap editor, enabling the embedding of various types of multimedia and posts directly within the editor. Below is a list of supported media types:

| Media Type  | Description                                    | Documentation                    |
|-------------|------------------------------------------------|---------------------------------------|
| `Images`      | Embed images within the editor.                | [More details](./src/nodes/image/)    |
| `YouTube`     | Embed YouTube videos within the editor.        | [More details](./src/nodes/youtube/)  |
| `Vimeo`       | Embed Vimeo videos within the editor.          | [More details](./src/nodes/vimeo/)    |
| `SoundCloud`  | Embed SoundCloud audio within the editor.      | [More details](./src/nodes/soundcloud/)|
| `Twitter`     | Embed Twitter posts within the editor.         | [More details](./src/nodes/twitter/)  |

> Missing a media type? Let us know. 📬

## Installation

Install the `extension-hypermultimedia` package via npm:

```bash
npm install @docs.plus/extension-hypermultimedia
```

## Configuration

Configure the `HyperMultimediaKit` by passing an object with the desired settings for each media type you wish to use.

```javascript
import { HyperMultimediaKit, vimeoModal } from "@docs.plus/extension-hypermultimedia";

HyperMultimediaKit.configure({
  Image,
  Youtube,
  Vimeo: {
    modal: vimeoModal, // default modal
    inline: true, // default false
  },
  SoundCloud: false,
  Twitter: false,
});
```

## Commands

### Youtube

```js
editor.commands.setYoutubeVideo({
  src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  width: 560,
  height: 315,
});
```

> For more details, check out [the Youtube document](./src/nodes/youtube/).

### Vimeo

```js
editor.commands.setVimeo({
  src: 'https://vimeo.com/123456789'
})
```

> For more details, check out [the Vimeo document](./src/nodes/vimeo/).

### Twitter

```js
editor.commands.setTwitter({
  src: 'https://twitter.com/tim_cook/status/1719021344854069441'
  float: "left",
});
```

> For more details, check out [the Twitter document](./src/nodes/twitter/).

### SoundCloud

```js
editor.commands.setSoundCloud({
  src: 'https://soundcloud.com/artist/track'
  margin: "0.2in"
});
```

> For more details, check out [the SoundCloud document](./src/nodes/soundcloud/).

### Image

```js
editor.commands.setImage({
  src: 'https://example.com/foobar.png',
  alt: 'A boring example image',
  title: 'An example'
})
```

> For more details, check out [the Image document](./src/nodes/image/).

## Sorce code and Example

- Demo: [extension-hypermultimedia](https://github.com/HMarzban/extension-hypermultimedia)
- Extension: [packages/extension-hypermultimedia](https://github.com/HMarzban/extension-hypermultimedia/tree/main/packages/extension-hypermultimedia)
- Usage: [packages/nextjs/src/components/Tiptap.tsx](https://github.com/HMarzban/extension-hypermultimedia/blob/main/packages/nextjs/src/components/Tiptap.tsx)

## Inspiration and Acknowledgment, Let's Connect

Thank you for exploring our `HyperMultimedia`` extension from docs.plus! We aim to make collaboration and knowledge sharing not just easy, but also enjoyable.

Our extension is inspired by Tiptap's [extension-image](https://tiptap.dev/api/nodes/image) and [extension-youtube](https://tiptap.dev/api/nodes/youtube). While we've incorporated our own enhancements, we'd like to tip our hats to Tiptap for pioneering the "headless" approach that we admire greatly.

Please note: We're not affiliated with Tiptap, but we believe in recognizing foundational work.

Your feedback and interest in [docs.plus](https://github.com/docs-plus/docs.plus) are invaluable to us. Share your thoughts, suggestions, or dive deeper into our mission at the docs.plus repository.

Wish to converse?
Connect with us [here](https://github.com/docs-plus/docs.plus#-connect-with-us).

# Extension-HyperMultimedia Documentation

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

## API Reference

### Commands

Explain any commands provided by your extension.

... detailed commands documentation ...

## Examples

```javascript
editor.commands.setYoutubeVideo({
  src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  width: 560,
  height: 315,
});

editor.commands.setVimeo({
  src: 'https://vimeo.com/123456789'
})

editor.commands.setTwitter({
  url: 'https://twitter.com/username/status/1234567890'
  float: "left",
});

editor.commands.setSoundCloud({
  url: 'https://soundcloud.com/artist/track'
  margin: "0.2in"
});

editor.commands.setImage({
  src: 'https://example.com/foobar.png',
  alt: 'A boring example image',
  title: 'An example'
})
```

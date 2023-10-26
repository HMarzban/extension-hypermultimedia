# Image

Use this extension to render `<img>` HTML tags. Block level node.

> **Restrictions:** This extension does only the rendering of images. It doesn’t upload images to your server, that’s a whole different story.

## Installation

```bash
npm install @docs.plus/extension-hypermedia
```

Then, import the extension into your editor:

```js
import { HypermediaKit } from "@docs.plus/extension-hypermedia";

HypermediaKit.configure({
  Image,
})
```

## Settings

### allowBase64

Allow images to be parsed as base64 strings `<img src="data:image/jpg;base64...">`.

- target: `Node`
- Default: `false`

```js
import { HypermediaKit } from "@docs.plus/extension-hypermedia";

HypermediaKit.configure({
  Image: {
    allowBase64: true,
  }
})
```

### modal

A modal box that apear when you <u>**click on image**</u>. A default modal box is provided which you can utilize or replace with your custom modal.

- target: `Node`
- Default: `true`

```js
import { HypermediaKit, imageModal } from "@docs.plus/extension-hypermedia";

HypermediaKit.configure({
  Image: {
    modal: imageModal, // default modal
  }
})
```

> To implement your own modal box, examine the default modal box and replicate the same methods. You can refer to the [source code](https://github.com/HMarzban/extension-hypermedia/tree/main/packages/extension-hypermedia/src/modals/image.ts) for more details.

### resizeGripper

a resize gripper that apear when you click on image.

- target: `Node`
default: `true`

```js
import { HypermediaKit, imageModal } from "@docs.plus/extension-hypermedia";

HypermediaKit.configure({
  Image: {
    modal: imageModal,
    resizeGripper: true,
  }
})
```

### HTMLAttributes

Custom HTML attributes that should be added to the rendered HTML tag.

- target: `Node`
- Default: `{}`

```js
import { HypermediaKit, imageModal } from "@docs.plus/extension-hypermedia";

HypermediaKit.configure({
  Image: {
    HTMLAttributes: {
      class: 'my-custom-class',
    },
  }
})

```

## Commands

### setImage()

Makes the current node an image.

```js
editor.commands.setImage({
  src: 'https://example.com/foobar.png'
});

editor.commands.setImage({
  src: 'https://example.com/foobar.png',
  alt: 'A boring example image',
  title: 'An example'
})

editor.commands.setImage({
  src: 'https://example.com/foobar.png',
  width: 200,
  height: 160,
  float: "unset",
  clear: "none",
  display: "block",
  margin: "0.2in"
})
```

### Options

|Option   |Description                                                            | Default|Optional |
|---      |---                                                                    |---      | --- |
|src      |The url of the youtube video. Can be a YouTube or YouTube Music link   |`null`   ||
|width    |The embed width (overrides the default option, optional)               |`null`   |✅ |
|height   |The embed height (overrides the default option, optional)              |`null`   |✅ |
|float    |The css style `float` (overrides the default option, optional)     |`unset`  |✅ |
|clear    |The css style `clear` (overrides the default option, optional)     |`none`   |✅ |
|display  |The css style `display` (overrides the default option, optional)   |`block`  |✅ |
|margin   |The css style `margin` (overrides the default option, optional)    |`0.0in`  |✅ |

## Source code

[packages/extension-image/](https://github.com/HMarzban/extension-hypermedia/tree/main/packages/extension-hypermedia/src/nodes/image/image.ts)

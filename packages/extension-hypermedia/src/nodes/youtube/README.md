# Youtube

This extension adds a new YouTube embed node to the editor.

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

### width, height

Controls the default width & height of added videos

- Target: `iframe`
- Default: `640`, `480`

```js
HypermediaKit.configure({
  Youtube: {
    width: 480,
    height: 320,
  }
})
```

### frameborder

Controls the default frameborder of added videos

- Target: `iframe`
- Default: `0`

```js
HypermediaKit.configure({
  Youtube: {
    frameborder: 1,
  }
})
```

### allow

Controls the default allow attribute of added videos

- Target: `iframe`
- Default: `accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`

```js
HypermediaKit.configure({
  Youtube: {
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  }
})
```

### allowFullscreen

Allows the iframe to be played in fullscreen

- Target: `iframe`
- Default: `true`

```js
HypermediaKit.configure({
  Youtube: {
    allowFullscreen: false,
  }
})
```


### modal

A modal box that apear when you `mouseover` on video. A default modal box is provided which you can utilize or replace with your custom modal.

- Target: `Node`
- Default: `true`

```js
import { HypermediaKit, youtubeModal } from "@docs.plus/extension-hypermedia";

HypermediaKit.configure({
  Youtube: {
    modal: youtubeModal, // default modal
  }
})
```

> To implement your own modal box, examine the default modal box and replicate the same methods. You can refer to the [source code](https://github.com/HMarzban/extension-hypermedia/tree/main/packages/extension-hypermedia/src/modals/youtube.ts) for more details.

### resizeGripper

a resize gripper that apear when you `mouseover` on video.

- Target: `Node`
- default: `true`

```js
import { HypermediaKit, youtubeModal } from "@docs.plus/extension-hypermedia";

HypermediaKit.configure({
  Youtube: {
    modal: youtubeModal,
    resizeGripper: true,
  }
})
```

### addPasteHandler

Enables or disables the paste handler for YouTube links,
if enabled, the editor will automatically convert YouTube links to embeds

- Target: `Node`
- Default: `true`

```js
HypermediaKit.configure({
  Youtube: {
    addPasteHandler: false,
  }
})
```

### controls

Enables or disables YouTube video controls

- Target: `URLSearchParams`
- Default: `1`

```js
HypermediaKit.configure({
  Youtube: {
    controls: 0,
  }
})
```

### nocookie

Enables the nocookie mode for YouTube embeds

- Target: `URLSearchParams`
- Default: `false`

```js
HypermediaKit.configure({
  Youtube: {
    nocookie: true,
  }
})
```

### autoplay

Allows the iframe to to start playing after the player is loaded

- Target: `URLSearchParams`
- Default: `0`

```js
HypermediaKit.configure({
  Youtube: {
    autoplay: 1,
  }
})
```

### ccLanguage

Specifies the default language that the player will use to display closed captions. Set the parameter's value to an ISO 639-1 two-letter language code. For example, setting it to `es` will cause the captions to be in spanish

- Target: `URLSearchParams`
- Default: `undefined`

```js
HypermediaKit.configure({
  Youtube: {
    ccLanguage: 'es',
  }
})
```

### ccLoadPolicy

Setting this parameter's value to `true` causes closed captions to be shown by default, even if the user has turned captions off

- Target: `URLSearchParams`
- Default: `0`

```js
HypermediaKit.configure({
  Youtube: {
    ccLoadPolicy: 1,
  }
})
```

### disableKBcontrols

Disables the keyboards controls for the iframe player

- Target: `URLSearchParams`
- Default: `0`

```js
HypermediaKit.configure({
  Youtube: {
    disableKBcontrols: 1,
  }
})
```

### enableIFrameApi

Enables the player to be controlled via IFrame Player API calls

- Target: `URLSearchParams`
- Default: `0`

```js
HypermediaKit.configure({
  Youtube: {
    enableIFrameApi: 1,
  }
})
```

### origin

This parameter provides an extra security measure for the IFrame API and is only supported for IFrame embeds. If you are using the IFrame API, which means you are setting the `enableIFrameApi` parameter value to `true`, you should always specify your domain as the origin parameter value.

- Target: `URLSearchParams`
- Default: `''`

```js
HypermediaKit.configure({
  Youtube: {
    origin: 'yourdomain.com',
  }
})
```

### endTime

This parameter specifies the time, measured in seconds from the start of the video, when the player should stop playing the video. For example, setting it to `15` will make the video stop at the 15 seconds mark

- Target: `URLSearchParams`
- Default: `0`

```js
HypermediaKit.configure({
  Youtube: {
    endTime: '15',
  }
})
```

### interfaceLanguage

Sets the player's interface language. The parameter value is an ISO 639-1 two-letter language code. For example, setting it to `fr` will cause the interface to be in french

- Target: `URLSearchParams`
- Default: `undefined`

```js
HypermediaKit.configure({
  Youtube: {
    interfaceLanguage: 'fr',
  }
})
```

### ivLoadPolicy

Setting this to `1` causes video annotations to be shown by default, whereas setting to `3` causes video annotations to not be shown by default

- Target: `URLSearchParams`
- Default: `0`

```js
HypermediaKit.configure({
  Youtube: {
    ivLoadPolicy: '3',
  }
})
```

### loop

This parameter has limited support in IFrame embeds. To loop a single video, set the loop parameter value to `true` and set the playlist parameter value to the same video ID already specified in the Player API URL.

- Target: `URLSearchParams`
- Default: `false`

```js
HypermediaKit.configure({
  Youtube: {
    loop: true,
  }
})
```

### playlist

This parameter specifies a comma-separated list of video IDs to play.

- Target: `URLSearchParams`
- Default: `''`

```js
HypermediaKit.configure({
  Youtube: {
     playlist: 'VIDEO_ID_1,VIDEO_ID_2,VIDEO_ID_3,...,VIDEO_ID_N',
  }
})
```

## Commands

### setYoutubeVideo(options)

Inserts a YouTube iframe embed at the current position

```js
editor.commands.setYoutubeVideo({
  src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  width: 640,
  height: 480,
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

[packages/extension-youtube/]((https://github.com/HMarzban/extension-hypermedia/tree/main/packages/extension-hypermedia/src/nodes/youtube/youtube.ts))

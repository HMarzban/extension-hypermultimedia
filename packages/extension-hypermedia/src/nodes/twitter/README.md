# Twitter

This extension render embedded Twitter tweets in your editor.

## Installation

```bash
npm install @docs.plus/extension-hypermedia
```

Then, import the extension into your editor:

```js
import { HypermediaKit } from "@docs.plus/extension-hypermedia";

HypermediaKit.configure({
  Twitter,
})
```

## Settings

### addPasteHandler

Enable the auto-embedding of tweets by pasting Twitter URLs directly into the editor.

- Target: `Node`
- Default: `true`

```js
HypermediaKit.configure({
  Twitter: {
    addPasteHandler: false,
  }
})
```

### theme

Define the theme of the embedded tweet, either light or dark.

- Target: `URLSearchParams`
- Default: `light`

```js
HypermediaKit.configure({
  Twitter: {
    theme: 'dark',
  }
})
```

### dnt

Enable the data tracking parameter.

- Target: `URLSearchParams`
- Default: `true`

```js
HypermediaKit.configure({
  Twitter: {
    dnt: false,
  }
})
```

### lang

Specify the language of the embedded tweet, e.g., `'en'` for English.

- Target: `URLSearchParams`
- Default: `'en'`

```js
HypermediaKit.configure({
  Twitter: {
    lang: 'fr',
  }
})
```

### width

Define the width of the embedded tweet.

- Target: `URLSearchParams`
- Default: `450`

```js
HypermediaKit.configure({
  Twitter: {
    width: 550,
  }
})
```

### height

Define the height of the embedded tweet.

- Target: `URLSearchParams`
- Default: `120`

```js
HypermediaKit.configure({
  Twitter: {
    height: 600,
  }
})
```

### limit

Define the maximum number of tweets to display.

- Target: `URLSearchParams`
- Default: `20`

```js
HypermediaKit.configure({
  Twitter: {
    limit: 10,
  }
})
```

### maxwidth

Define the maximum width of the embedded tweet.

- Target: `URLSearchParams`
- Default: `550`

```js
HypermediaKit.configure({
  Twitter: {
    maxwidth: 600,
  }
})
```

### maxheight

Define the maximum height of the embedded tweet.

- Target: `URLSearchParams`
- Default: `600`

```js
HypermediaKit.configure({
  Twitter: {
    maxheight: 650,
  }
})
```

### chrome

Define the chrome of the embedded tweet.

- Target: `URLSearchParams`
- Default: `noheader nofooter noborders noscrollbar transparent`

```js
HypermediaKit.configure({
  Twitter: {
    chrome: 'noheader nofooter noborders noscrollbar transparent',
  }
})
```

### aria_polite

Define the ARIA live region politeness value for tweets added to a timeline.

- Target: `URLSearchParams`
- Default: `polite`

```js
HypermediaKit.configure({
  Twitter: {
    aria_polite: 'assertive',
  }
})
```

### modal

A modal box that appears when you <u>**click on the tweet**</u>. A default modal box is provided which you can utilize or replace with your custom modal.

- Target: `Node`
- Default: `false`

```js
import { HypermediaKit, twitterModal } from "@docs.plus/extension-hypermedia";

HypermediaKit.configure({
  Twitter: {
    modal: twitterModal, // default modal
  }
})
```

> To implement your own modal box, examine the default modal box and replicate the same methods. You can refer to the [source code](https://github.com/HMarzban/extension-hypermedia/tree/main/packages/extension-hypermedia/src/modals/twitter.ts) for more details.

## Commands

### addTwitter()

Embed a Twitter tweet into the current node.

```js
editor.commands.addTwitter({
  url: 'https://twitter.com/username/status/1234567890'
});

editor.commands.addTwitter({
  url: 'https://twitter.com/username/status/1234567890',
  theme: 'dark',
  width: '550px',
  height: '600px',
  float: "unset",
  clear: "none",
  display: "block",
  margin: "0.2in"
})
```

### Options

|Option          |Description                                                               |Default    |Optional |
|---             |---                                                                       |---        |---      |
|url             |The URL of the twitter                                                    |`null`     |         |
|width           |The embed width (overrides the default option, optional)                  |`450`      |✅       |
|height          |The embed height (overrides the default option, optional)                 |`120`      |✅       |
|float           |The CSS style `float` (overrides the default option, optional)            |`unset`    |✅       |
|clear           |The CSS style `clear` (overrides the default option, optional)            |`none`     |✅       |
|display         |The CSS style `display` (overrides the default option, optional)          |`block`    |✅       |
|margin          |The CSS style `margin` (overrides the default option, optional)           |`0.0in`    |✅       |
|justifyContent  |The CSS style `justify-content` (overrides the default option, optional)  |`start`    |✅       |

## Source code

[packages/extension-hypermedia/twitter](https://github.com/HMarzban/extension-hypermedia/tree/main/packages/extension-hypermedia/src/nodes/twitter/twitter.ts)
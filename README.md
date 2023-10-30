# HyperMultimedia Extension for Tiptap Editor

[![Version](https://img.shields.io/npm/v/@docs.plus/extension-hypermultimedia.svg?label=version)](https://www.npmjs.com/package/@docs.plus/extension-hypermultimedia)
[![Downloads](https://img.shields.io/npm/dm/@docs.plus/extension-hypermultimedia.svg)](https://npmcharts.com/compare/@docs.plus/extension-hypermultimedia)
[![License](https://img.shields.io/npm/l/@docs.plus/extension-hypermultimedia.svg)](https://www.npmjs.com/package/@docs.plus/extension-hypermultimedia)

## All About You: Headless UI

We designed the `HyperMultimedia` extension as a headless UI. You're in the driver's seat here! This means you can build your own interface while using our back-end functions. If you want to keep your application's UI consistent, this is perfect for you.

## Setting Up - Easy As 1, 2, 3

Getting the `HyperMultimedia` extension up and running on your project is super simple. Follow these steps:

1. Install the package:

```bash
npm install @docs.plus/extension-hypermultimedia
```

2. Import the extension into your project:

```js
import { HyperMultimediaKit } from "@docs.plus/extension-hypermultimedia";
```

3. Add the extension to your Tiptap Editor:

```js
editor = new Editor({
  // Other configurations

  extensions: [
    // Other extensions
    HyperMultimediaKit,
  ]
});
```

Note: By default, the Image, YouTube, Vimeo, SoundCloud, and Twitter are active. To disable a specific media type, follow the instructions below:

```js
editor = new Editor({
  // Other configurations

  extensions: [
    // Other extensions
    HyperMultimediaKit:{
      Image: false,
      SoundCloud: false
    },
  ]
});
```

> You can find more detailed setup instructions [here]('./packages/extension-hypermultimedia').

## Test Drive With Our Demo 🚗

Want to take a spin with our `HyperMultimedia` extension? We have a <u>**Demo ready**</u> for you:

### Step 0: Clone the Repo

First, clone the repo to your local machine:

```bash
git clone https://github.com/HMarzban/extension-hypermultimedia.git
```

### Step 1: Get the Essentials

Before hitting the road, make sure your tank's full! Install the necessary dependencies with:

```bash
yarn install
```

### Step 2: Run the Demo

With everything in place, you're ready to go. Run the demo with:

```bash
yarn start
```

Now, you can explore all that our <u>HyperMultimedia extension</u> has to offer in a real-life setting. Enjoy the ride!

### Gif Time! 🎉

## What's Next? 🚀

In our mission to make your life easier, we have some exciting features lined up:

- More control on the emebded iframe
- support more media type, like spotify and etc.
- And much more on the way!

## Join Our Journey 🤝

We love hearing from our users. Your suggestions, your issues, your PRs - they're all welcome. So don't be shy, feel free to get in touch on GitHub.

We're grateful you chose our `HyperMultimedia` extension. We hope it makes your Tiptap experience even better.

### Making Your docs.plus Even Better 💼

This extension is primarily built for the [docs.plus](http://github.com/docs-plus/docs.plus) project, an open-source platform for real-time collaboration. With this tool, communities can share and organize information in a logical, hierarchical manner, just like they want it.

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

> Do not forget to import the `HyperMultimedia` styles.scss file into your project.

<details>
<summary>The `hypermultimedia` styles.scss</summary>

```scss
.hypermultimedia {
  iframe {
    background-color: #fafafa;
  }

  &__resize-gripper {
    position: absolute;
    margin: 0;
    display: none;

    .media-resize-clamp {
      width: 10px;
      height: 10px;
      background-color: #1a73e8;
      border: 1px solid #fff;
      display: none;

      &--rotate {
        border-radius: 50%;
        position: absolute;
        top: -28px;
        left: 50%;
        transform: translateX(-50%);
        cursor: crosshair;

        &::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 1.5px;
          height: 30px;
          background-color: #1a73e8;
        }
      }

      &--left {
        position: absolute;
        top: 50%;
        left: -5px;
        transform: translateY(-50%);
        cursor: ew-resize;
      }

      &--right {
        position: absolute;
        top: 50%;
        right: -5px;
        transform: translateY(-50%);
        cursor: ew-resize;
      }

      &--top {
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        cursor: ns-resize;
      }

      &--bottom {
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        cursor: ns-resize;
      }

      &--top-left {
        position: absolute;
        top: -5px;
        left: -5px;
        cursor: nwse-resize;
      }

      &--top-right {
        position: absolute;
        top: -5px;
        right: -5px;
        cursor: nesw-resize;
      }

      &--bottom-left {
        position: absolute;
        bottom: -5px;
        left: -5px;
        cursor: nesw-resize;
      }

      &--bottom-right {
        position: absolute;
        bottom: -5px;
        right: -5px;
        cursor: nwse-resize;
      }
    }

    &--active {
      border: 1.5px solid #1a73e8;
      display: block;
      .media-resize-clamp {
        display: block;
      }
    }
  }

  &__modal {
    padding: 8px 8px;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.1);
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    &__divider {
      border-left: 2px solid #e5e7eb;
      height: 5px;
      margin: 6px 10px;
    }

    select {
      @apply border-gray-300 py-2 px-2 rounded-md;
      &:hover {
        background-color: #eee;
      }
    }

    button {
      border-color: #d1d5db;
      padding: 8px;
      border-radius: 0.375rem;
      &:hover {
        background-color: #eee;
      }
    }

    &__btn--resize {
      svg {
      }
    }

    &--active {
      background-color: #1a73e8;
      fill: #fff;
      &:hover {
        svg {
          fill: black;
        }
      }
      svg {
        fill: #fff;
      }
    }
  }
}
```

</details>

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

> You can find more detailed and deep dive in setup instructions [here](./packages/extension-hypermultimedia).

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

### Demo Time! 🎉

<https://github.com/HMarzban/extension-hypermultimedia/assets/20157508/360ed068-57df-472c-bb72-4a80818a4a8f>

## What's Next? 🚀

In our mission to make your life easier, we have some exciting features lined up:

- More control on the emebded iframe
- support more media type, like `Spotify` ro `Instagram` and etc.
- And much more on the way!

## Join Our Journey 🤝

We love hearing from our users. Your suggestions, your issues, your PRs - they're all welcome. So don't be shy, feel free to get in touch on GitHub.

We're grateful you chose our `HyperMultimedia` extension. We hope it makes your Tiptap experience even better.

### Making Your docs.plus Even Better 💼

This extension is primarily built for the [docs.plus](http://github.com/docs-plus/docs.plus) project, an open-source platform for real-time collaboration. With this tool, communities can share and organize information in a logical, hierarchical manner, just like they want it.

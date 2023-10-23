import { Node, mergeAttributes, nodePasteRule } from "@tiptap/core";
import { SOUNDCLOUD_URL_REGEX_GLOBAL, getSoundCloudEmbedUrl, isValidSoundCloudUrl } from "./helper";
import { createTooltip, applyStyles } from "../../utils/utils";
import { MediaPlacement } from "../../utils/media-placement";

export interface SoundCloudOptions {
  width?: number | string; // Width of the embedded SoundCloud player
  height?: number | string; // Height of the embedded SoundCloud player
  visual?: boolean; // set to true for a video player, false for audio player
  autoPlay?: boolean; // set to true to autoplay the track on load
  scrolling?: string; // set to yes to allow scrolling
  frameborder?: string; // set to no to hide frame border
  allow?: string; // set to autoplay to allow the track to autoplay
  hideRelated?: boolean; // set to true to hide related tracks
  showComments?: boolean; // set to false to hide comments
  showUser?: boolean; // set to false to hide the uploader name and avatar
  showReposts?: boolean; // set to false to hide reposts
  addPasteHandler: boolean;
  HTMLAttributes: Record<string, any>;
  modal?: ((options: MediaPlacement) => HTMLElement | void | null) | null;
}

type SetSoundCloudOptions = {
  url: string;
  width?: number;
  height?: number;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    soundCloud: {
      addSoundCloud: (options: SetSoundCloudOptions) => ReturnType;
    };
  }
}

export const SoundCloud = Node.create<SoundCloudOptions>({
  name: "SoundCloud",
  group: "block",
  draggable: true,
  isolating: true,
  atom: true,

  addOptions() {
    return {
      width: "460",
      height: "130",
      visual: false,
      autoPlay: false,
      addPasteHandler: true,
      HTMLAttributes: {},
      modal: null,
    };
  },

  addAttributes() {
    return {
      url: {
        default: null,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: this.options.height,
      },
      float: {
        default: null,
      },
      clear: {
        default: null,
      },
      margin: {
        default: null,
      },
      display: {
        default: null,
      },
      visual: {
        default: this.options.visual,
      },
      autoPlay: {
        default: this.options.autoPlay,
      },
      scrolling: {
        default: "no",
      },
      frameborder: {
        default: "no",
      },
      allow: {
        default: "autoplay",
      },
      hideRelated: {
        default: null,
      },
      showComments: {
        default: null,
      },
      showUser: {
        default: null,
      },
      showReposts: {
        default: null,
      },
    };
  },

  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const editor = this.editor;
      const modal = this.options.modal;

      const dom = document.createElement("div");
      const content = document.createElement("div");
      const iframe = document.createElement("iframe");

      const { tooltip, tippyModal } = createTooltip(editor);

      dom.classList.add("sound-cloud__content");

      const styles = {
        display: node.attrs.display,
        height: parseInt(node.attrs.height),
        width: parseInt(node.attrs.width),
        float: node.attrs.float,
        clear: node.attrs.clear,
        margin: node.attrs.margin,
      };

      applyStyles(dom, styles);

      if (styles?.height > 130) {
        HTMLAttributes.visual = true;
      }

      const soundCloudAttrs = {
        url: HTMLAttributes.url,
        autoPlay: HTMLAttributes.autoPlay,
        hideRelated: HTMLAttributes.hideRelated,
        showComments: HTMLAttributes.showComments,
        showUser: HTMLAttributes.showUser,
        showReposts: HTMLAttributes.showReposts,
        visual: HTMLAttributes.visual,
        width: HTMLAttributes.width,
        height: HTMLAttributes.height,
        scrolling: this.options.scrolling,
        frameborder: this.options.frameborder,
        allow: this.options.allow,
      };

      const embedUrl = getSoundCloudEmbedUrl(soundCloudAttrs) as string;
      HTMLAttributes.src = embedUrl;

      const attributes = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-node-name": this.name,
        ...soundCloudAttrs,
      });

      if (modal) {
        iframe.addEventListener("mouseenter", (e) => {
          modal && modal({ editor, tooltip, tippyModal, iframe, wrapper: dom });
        });
      }

      iframe.setAttribute("src", embedUrl);

      Object.entries(attributes).forEach(([key, value]) => iframe.setAttribute(key, value));

      content.append(iframe);

      dom.append(content);

      return {
        dom,
        contentDOM: content,
        ignoreMutation: (mutation) => {
          return !dom.contains(mutation.target) || dom === mutation.target;
        },
        update: (updatedNode) => {
          if (updatedNode.type.name !== this.name) return true;
          return false;
        },
      };
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-soundcloud] iframe",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const height = parseInt(HTMLAttributes.height);
    const width = parseInt(HTMLAttributes.width);
    const float = HTMLAttributes.float;
    const clear = HTMLAttributes.clear;
    const margin = HTMLAttributes.margin;
    const display = HTMLAttributes.display;

    if (height > 130) {
      HTMLAttributes.visual = true;
    }

    const embedUrl = getSoundCloudEmbedUrl({
      url: HTMLAttributes.src,
    });

    HTMLAttributes.src = embedUrl;

    const style = `display: ${display}; height:${height}px; width: ${width}px; float: ${float}; clear: ${clear}; margin: ${margin}`;

    return [
      "div",
      { "data-soundcloud-video": "", class: "soundcloud-video", style },
      [
        "iframe",
        mergeAttributes(
          this.options.HTMLAttributes,
          {
            width: this.options.width,
            height: this.options.height,
            scrolling: this.options.scrolling,
            frameborder: this.options.frameborder,
            allow: this.options.allow,
          },
          HTMLAttributes
        ),
      ],
    ];
  },

  addCommands() {
    return {
      addSoundCloud:
        (options) =>
        ({ commands }) => {
          if (!isValidSoundCloudUrl(options.url)) {
            return false;
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addPasteRules() {
    if (!this.options.addPasteHandler) {
      return [];
    }

    return [
      nodePasteRule({
        find: SOUNDCLOUD_URL_REGEX_GLOBAL,
        type: this.type,
        getAttributes: (match) => {
          return { url: match.input };
        },
      }),
    ];
  },

  addProseMirrorPlugins() {
    return [];
  },
});

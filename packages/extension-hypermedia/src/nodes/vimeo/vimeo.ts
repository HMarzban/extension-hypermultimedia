import { Node, mergeAttributes, nodePasteRule } from "@tiptap/core";
import { getEmbedUrlFromVimeoUrl, isValidVimeoUrl, VIMEO_REGEX_GLOBAL } from "./helper";
import { createTooltip, applyStyles } from "../../utils/utils";
import { MediaPlacement } from "../../utils/media-placement";

export interface VimeoOptions {
  addPasteHandler?: boolean;
  allowFullscreen?: boolean;
  autoplay?: boolean;
  color?: string;
  controls?: boolean;
  dnt?: boolean;
  keyboard?: boolean;
  loop?: boolean;
  muted?: boolean;
  pip?: boolean;
  playsinline?: boolean;
  portrait?: boolean;
  quality?: string;
  speed?: boolean;
  startTime?: string;
  texttrack?: string;
  title?: boolean;
  height?: number;
  width?: number;
  allow?: string;
  HTMLAttributes?: any;
  modal?: ((options: MediaPlacement) => HTMLElement | void | null) | null;
}

type SetVimeoVideoOptions = {
  src: string;
  width?: number;
  height?: number;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    Vimeo: {
      setVimeoVideo: (options: SetVimeoVideoOptions) => ReturnType;
    };
  }
}

export const Vimeo = Node.create<VimeoOptions>({
  name: "Vimeo",
  draggable: true,
  group: "block",
  // inline: true,
  atom: true,
  isolating: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      modal: null,
      addPasteHandler: true,
      allowFullscreen: true,
      autoplay: false,
      ccLanguage: undefined,
      ccLoadPolicy: undefined,
      controls: true,
      disableKBcontrols: false,
      enableIFrameApi: false,
      endTime: 0,
      height: 480,
      interfaceLanguage: undefined,
      ivLoadPolicy: 0,
      loop: false,
      modestBranding: false,
      nocookie: false,
      origin: "",
      playlist: "",
      progressBarColor: undefined,
      width: 640,
      allow: undefined,
    };
  },

  addAttributes() {
    return {
      margin: {
        default: "0in",
      },
      clear: {
        default: "none",
      },
      float: {
        default: "unset",
      },
      display: {
        default: "block",
      },
      src: {
        default: null,
      },
      start: {
        default: 0,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: this.options.height,
      },
    };
  },

  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const editor = this.editor;
      const modal = this.options.modal;
      const { tooltip, tippyModal } = createTooltip(editor);

      const dom = document.createElement("div");
      const content = document.createElement("div");
      const iframe = document.createElement("iframe");

      dom.classList.add("vimeo-video__content");

      const styles = {
        display: node.attrs.display,
        height: parseInt(node.attrs.height),
        width: parseInt(node.attrs.width),
        float: node.attrs.float,
        clear: node.attrs.clear,
        margin: node.attrs.margin,
      };

      applyStyles(dom, styles);

      const vimeoAttrs = {
        url: HTMLAttributes.src,
        autoplay: this.options.autoplay,
        controls: this.options.controls,
        loop: this.options.loop,
        color: this.options.color,
        dnt: this.options.dnt,
        keyboard: this.options.keyboard,
        muted: this.options.muted,
        pip: this.options.pip,
        playsinline: this.options.playsinline,
        portrait: this.options.portrait,
        quality: this.options.quality,
        speed: this.options.speed,
        texttrack: this.options.texttrack,
        title: this.options.title,
        height: this.options.height,
        width: this.options.width,
        allowfullscreen: this.options.allowFullscreen,
        allow: this.options.allow,
      };

      const embedUrl = getEmbedUrlFromVimeoUrl(vimeoAttrs) || "";

      HTMLAttributes.src = embedUrl;

      const attributes = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-node-name": this.name,
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
          if (
            updatedNode.type.name === this.name &&
            (updatedNode.attrs.height !== this.options.height ||
              updatedNode.attrs.width !== this.options.width)
          ) {
            dom.style.height = `${updatedNode.attrs.height}px`;
            iframe.style.height = `${updatedNode.attrs.height}px`;
            dom.style.width = `${updatedNode.attrs.width}px`;
            iframe.style.width = `${updatedNode.attrs.width}px`;

            return false;
          }
          if (updatedNode.type.name !== this.name) return false;
          return true;
        },
      };
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-vimeo-video] iframe",
      },
    ];
  },

  addCommands() {
    return {
      setVimeoVideo:
        (options: SetVimeoVideoOptions) =>
        ({ commands }) => {
          if (!isValidVimeoUrl(options.src)) {
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
        find: VIMEO_REGEX_GLOBAL,
        type: this.type,
        getAttributes: (match) => {
          return { src: match.input };
        },
      }),
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const vimeoAttrs = {
      url: HTMLAttributes.src,
      autoplay: this.options.autoplay,
      controls: this.options.controls,
      loop: this.options.loop,
      color: this.options.color,
      dnt: this.options.dnt,
      keyboard: this.options.keyboard,
      muted: this.options.muted,
      pip: this.options.pip,
      playsinline: this.options.playsinline,
      portrait: this.options.portrait,
      quality: this.options.quality,
      speed: this.options.speed,
      texttrack: this.options.texttrack,
      title: this.options.title,
      height: this.options.height,
      width: this.options.width,
      allowfullscreen: this.options.allowFullscreen,
      allow: this.options.allow,
    };

    const embedUrl = getEmbedUrlFromVimeoUrl(vimeoAttrs);
    HTMLAttributes.src = embedUrl;

    const height = parseInt(HTMLAttributes.height);
    const width = parseInt(HTMLAttributes.width);
    const float = HTMLAttributes.float;
    const clear = HTMLAttributes.clear;
    const margin = HTMLAttributes.margin;
    const display = HTMLAttributes.display;

    const style = `display: ${display}; height:${height}px; width: ${width}px; float: ${float}; clear: ${clear}; margin: ${margin}`;

    return [
      "div",
      { "data-vimeo-video": "", class: "vimeo-video", style },
      [
        "iframe",
        mergeAttributes(
          this.options.HTMLAttributes,
          {
            ...vimeoAttrs,
          },
          HTMLAttributes
        ),
      ],
    ];
  },

  addProseMirrorPlugins() {
    return [];
  },
});

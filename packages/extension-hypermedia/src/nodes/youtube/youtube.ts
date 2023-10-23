import { mergeAttributes, Node, nodePasteRule } from "@tiptap/core";
import { getEmbedUrlFromYoutubeUrl, isValidYoutubeUrl, YOUTUBE_REGEX_GLOBAL } from "./helper";
import { createTooltip, applyStyles } from "../../utils/utils";
import { MediaPlacement } from "../../utils/media-placement";

export interface YoutubeOptions {
  addPasteHandler: boolean;
  allowFullscreen: boolean;
  autoplay: boolean;
  ccLanguage?: string;
  ccLoadPolicy?: boolean;
  controls: boolean;
  disableKBcontrols: boolean;
  enableIFrameApi: boolean;
  endTime: number;
  height: number;
  interfaceLanguage?: string;
  ivLoadPolicy: number;
  loop: boolean;
  modestBranding: boolean;
  HTMLAttributes: Record<string, any>;
  nocookie: boolean;
  origin: string;
  playlist: string;
  progressBarColor?: string;
  width: number;
  modal?: ((options: MediaPlacement) => HTMLElement | void | null) | null;
}

type SetYoutubeVideoOptions = {
  src: string;
  width?: number;
  height?: number;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    Youtube: {
      setYoutubeVideo: (options: SetYoutubeVideoOptions) => ReturnType;
    };
  }
}

export const Youtube = Node.create<YoutubeOptions>({
  name: "Youtube",
  draggable: true,
  group: "block",
  atom: true,
  isolating: true,

  addOptions() {
    return {
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
      modal: null,
      interfaceLanguage: undefined,
      ivLoadPolicy: 0,
      loop: false,
      modestBranding: false,
      HTMLAttributes: {},
      nocookie: false,
      origin: "",
      playlist: "",
      progressBarColor: undefined,
      width: 640,
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
    return ({ node, HTMLAttributes, editor }) => {
      const modal = this.options.modal;

      const { tooltip, tippyModal } = createTooltip(editor);

      const dom = document.createElement("div");
      const content = document.createElement("div");
      const iframe = document.createElement("iframe");

      dom.classList.add("youtube-video__content");

      const styles = {
        display: node.attrs.display,
        height: parseInt(node.attrs.height),
        width: parseInt(node.attrs.width),
        float: node.attrs.float,
        clear: node.attrs.clear,
        margin: node.attrs.margin,
      };

      applyStyles(dom, styles);

      const youtubeAttrs = {
        url: HTMLAttributes.src,
        allowFullscreen: this.options.allowFullscreen,
        autoplay: this.options.autoplay,
        ccLanguage: this.options.ccLanguage,
        ccLoadPolicy: this.options.ccLoadPolicy,
        controls: this.options.controls,
        disableKBcontrols: this.options.disableKBcontrols,
        enableIFrameApi: this.options.enableIFrameApi,
        endTime: this.options.endTime,
        interfaceLanguage: this.options.interfaceLanguage,
        ivLoadPolicy: this.options.ivLoadPolicy,
        loop: this.options.loop,
        modestBranding: this.options.modestBranding,
        nocookie: this.options.nocookie,
        origin: this.options.origin,
        playlist: this.options.playlist,
        progressBarColor: this.options.progressBarColor,
        startAt: HTMLAttributes.start || 0,
      };

      const embedUrl = getEmbedUrlFromYoutubeUrl(youtubeAttrs) as string;

      HTMLAttributes.src = embedUrl;

      const attributes = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-node-name": this.name,
        ...youtubeAttrs,
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
        tag: "div[data-youtube-video] iframe",
      },
    ];
  },

  addCommands() {
    return {
      setYoutubeVideo:
        (options: SetYoutubeVideoOptions) =>
        ({ commands }) => {
          if (!isValidYoutubeUrl(options.src)) {
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
        find: YOUTUBE_REGEX_GLOBAL,
        type: this.type,
        getAttributes: (match) => {
          return { src: match.input };
        },
      }),
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const embedUrl = getEmbedUrlFromYoutubeUrl({
      url: HTMLAttributes.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: HTMLAttributes.start || 0,
    });

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
      { "data-youtube-video": "", class: "youtube-video", style },
      [
        "iframe",
        mergeAttributes(
          this.options.HTMLAttributes,
          {
            width: this.options.width,
            height: this.options.height,
            allowfullscreen: this.options.allowFullscreen,
            autoplay: this.options.autoplay,
            ccLanguage: this.options.ccLanguage,
            ccLoadPolicy: this.options.ccLoadPolicy,
            disableKBcontrols: this.options.disableKBcontrols,
            enableIFrameApi: this.options.enableIFrameApi,
            endTime: this.options.endTime,
            interfaceLanguage: this.options.interfaceLanguage,
            ivLoadPolicy: this.options.ivLoadPolicy,
            loop: this.options.loop,
            modestBranding: this.options.modestBranding,
            origin: this.options.origin,
            playlist: this.options.playlist,
            progressBarColor: this.options.progressBarColor,
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

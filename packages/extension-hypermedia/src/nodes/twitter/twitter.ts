import { Node, nodePasteRule } from "@tiptap/core";
import {
  isValidTwitterUrl,
  TWITTER_URL_REGEX_GLOBAL,
  loadTwitterScript,
  fetchOEmbedHtml,
} from "./helper";
import { createTooltip, applyStyles } from "../../utils/utils";
import { MediaPlacement } from "../../utils/dialogs/media-placement";

export interface TwitterOptions {
  addPasteHandler?: boolean;
  id?: string; // Tweet ID
  url: string; // Tweet URL
  theme?: "light" | "dark"; // Theme of the embedded Tweet
  width?: number | string; // Width of the embedded Tweet, e.g., 550 or '550px'
  height?: number | string; // Height of the embedded Tweet, e.g., 600 or '600px'
  dnt?: boolean; // Data tracking parameter
  frame?: boolean; // Frame parameter
  hideCard?: boolean; // Hide card parameter
  hideThread?: boolean; // Hide thread parameter
  lang?: string; // Language parameter, e.g., 'en' for English
  ariaPolite?: "polite" | "assertive" | "rude"; // Aria polite parameter
  tweetLimit?: number; // Tweet limit parameter, e.g., 5 for displaying 5 tweets
  dialogBox?: ((options: MediaPlacement) => HTMLElement | void | null) | null;
}

type AddTwitterOptions = {
  url: string;
  width?: number;
  height?: number;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    Twitter: {
      addTwitter: (options: AddTwitterOptions) => ReturnType;
    };
  }
}

export const Twitter = Node.create({
  name: "Twitter",
  group: "block",
  draggable: true,

  addOptions() {
    return {
      theme: "light",
      lang: "en",
      dnt: true,
      dialogBox: null,
      addPasteHandler: true,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      url: {
        default: null,
      },
      theme: {
        default: this.options.theme,
      },
      lang: {
        default: this.options.lang,
      },
      cards: {
        default: null,
      },
      conversation: {
        default: null,
      },
      width: {
        default: null,
      },
      align: {
        default: null,
      },
      dnt: {
        default: this.options.dnt,
      },
      dir: {
        default: null,
      },
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
      justifyContent: {
        default: "start",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "blockquote.twitter-tweet",
        getAttrs: (node: string | HTMLElement) => {
          if (typeof node === "string") return {};

          return {
            url: (node as HTMLElement).querySelector("a")?.getAttribute("href"),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const url = HTMLAttributes.url;

    return [
      "blockquote",
      {
        class: "twitter-tweet",
        ...HTMLAttributes,
      },
      ["a", { href: url }, url],
    ];
  },

  addCommands() {
    return {
      addTwitter:
        (options) =>
        ({ commands }) => {
          if (!isValidTwitterUrl(options.url)) {
            return false;
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ({ node, HTMLAttributes, editor }) => {
      const dialogBox = this.options.dialogBox;

      const wrapper = document.createElement("div");
      wrapper.classList.add("twitter-card__content");

      const { tooltip, tippyModal } = createTooltip(editor);

      const styles = {
        display: node.attrs.display,
        height: parseInt(node.attrs.height),
        width: parseInt(node.attrs.width),
        float: node.attrs.float,
        clear: node.attrs.clear,
        margin: node.attrs.margin,
        justifyContent: node.attrs.justifyContent,
      };

      applyStyles(wrapper, styles);

      if (styles?.height > 130) {
        HTMLAttributes.visual = true;
      }

      const blockquote = document.createElement("blockquote");
      blockquote.classList.add("twitter-tweet");

      // append all HTMLAttributes to the blockquote
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        if (this.options[key] || value)
          blockquote.setAttribute(`data-${key}`, value || this.options[key]);
      });

      const anchor = document.createElement("a");
      anchor.href = HTMLAttributes.url;
      anchor.textContent = HTMLAttributes.url;

      blockquote.appendChild(anchor);
      wrapper.appendChild(blockquote);

      if (dialogBox) {
        wrapper.addEventListener("mouseenter", (e) => {
          const iframe = wrapper.querySelector("iframe") as HTMLIFrameElement;
          dialogBox && dialogBox({ editor, tooltip, tippyModal, wrapper, iframe });
        });
      }

      const params = {
        url: HTMLAttributes.url,
        theme: HTMLAttributes.theme,
        width: HTMLAttributes.width,
        cards: HTMLAttributes.cards,
        dnt: HTMLAttributes.dnt,
        lang: HTMLAttributes.lang,
        conversation: HTMLAttributes.conversation,
        align: HTMLAttributes.align,
        dir: HTMLAttributes.dir,
        omit_script: 1,
      };

      // Fetch oEmbed HTML
      fetchOEmbedHtml(params)
        .then((html) => {
          wrapper.innerHTML = html;
          // Load Twitter widgets script
          loadTwitterScript().then((twttr) => {
            twttr.widgets.load(wrapper);
          });
        })
        .catch((error) => {
          loadTwitterScript().then((twttr) => {
            twttr.widgets.load(wrapper);
          });
        });

      return {
        dom: wrapper,
        ignoreMutation: (mutation) => {
          return !wrapper.contains(mutation.target) || wrapper === mutation.target;
        },
        update: (updatedNode) => {
          if (updatedNode.type.name !== this.name) return false;
          return true;
        },
      };
    };
  },

  addPasteRules() {
    if (!this.options.addPasteHandler) {
      return [];
    }

    return [
      nodePasteRule({
        find: TWITTER_URL_REGEX_GLOBAL,
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

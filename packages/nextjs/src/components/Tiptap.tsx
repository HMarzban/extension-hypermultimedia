import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import editorContents from "./editorContents";
import { HocuspocusProvider } from "@hocuspocus/provider";
import MenuBar from "./MenuBar";
import {
  HyperMultimediaKit,
  imageModal,
  youtubeModal,
  vimeoModal,
  soundCloudModal,
  twitterModal,
  videoModal,
  audioModal,
} from "@docs.plus/extension-hypermultimedia";

import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";
import {
  Hyperlink,
  previewHyperlinkModal,
  setHyperlinkModal,
} from "@docs.plus/extension-hyperlink";

const ydoc = new Y.Doc();

const provider = new HocuspocusProvider({
  url: "ws://127.0.0.1:1234",
  name: "example-document",
});

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure(),
      Hyperlink.configure({
        hyperlinkOnPaste: false,
        openOnClick: true,
        modals: {
          previewHyperlink: previewHyperlinkModal,
          setHyperlink: setHyperlinkModal,
        },
      }),
      HyperMultimediaKit.configure({
        Image: {
          modal: imageModal,
          inline: true,
        },
        Video: {
          modal: videoModal,
          inline: true,
        },
        Audio: {
          modal: audioModal,
          inline: true,
        },
        Youtube: {
          modal: youtubeModal,
          inline: true,
        },
        Vimeo: {
          modal: vimeoModal,
          inline: true,
        },
        SoundCloud: {
          modal: soundCloudModal,
          inline: true,
        },
        Twitter: {
          modal: twitterModal,
          inline: true,
          theme: "dark",
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Collaboration.configure({
        document: provider.document,
      }),
    ],
    content: editorContents,
  });

  return (
    <div className="w-[80rem] p-6 border rounded-md">
      <MenuBar editor={editor} />
      <div className="mt-4">
        <EditorContent editor={editor} id="editorContents" />
      </div>
    </div>
  );
};

export default Tiptap;

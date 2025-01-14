import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
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
import Collaboration from "@tiptap/extension-collaboration";
import {
  Hyperlink,
  previewHyperlinkModal,
  setHyperlinkModal,
} from "@docs.plus/extension-hyperlink";

import editorContents from "./editorContents";
import MenuBar from "./MenuBar";

const ydoc = new Y.Doc();

const Tiptap = () => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        history: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
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

      Collaboration.configure({
        document: ydoc,
      }),
    ],
  });

  useEffect(() => {
    const provider = new HocuspocusProvider({
      url: "ws://127.0.0.1:1234",
      name: "example-document",
      document: ydoc,
      // The onSynced callback ensures initial content is set only once using editor.setContent(), preventing repetitive content loading on editor syncs.
      onSynced() {
        if (!ydoc.getMap("config").get("initialContentLoaded") && editor) {
          ydoc.getMap("config").set("initialContentLoaded", true);

          editor.commands.setContent(editorContents);
        }
      },
    });
  }, [editor]);

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

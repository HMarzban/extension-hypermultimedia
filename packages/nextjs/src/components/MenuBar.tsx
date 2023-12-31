import { Editor as TiptapEditor } from "@tiptap/react";
import { useCallback } from "react";

const MenuBar: React.FC<{ editor: TiptapEditor | null }> = ({ editor }) => {
  const addImage = useCallback(() => {
    const url = window.prompt("Enter Image URL");
    if (!url || !editor) return;

    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addYoutubeVideo = useCallback(() => {
    const url = prompt("Enter YouTube URL");
    if (!url || !editor) return;

    editor.commands.setYoutubeVideo({
      src: url,
      width: 640,
      height: 480,
    });
  }, [editor]);

  const addVimeoVideo = useCallback(() => {
    const url = prompt("Enter Vimeo URL");
    if (!url || !editor) return;

    editor.commands.setVimeo({
      src: url,
      width: 640,
      height: 480,
    });
  }, [editor]);

  const addTwitterVideo = useCallback(() => {
    const url = prompt("Enter Twitter URL");
    if (!url || !editor) return;

    editor.commands.setTwitter({
      src: url,
    });
  }, [editor]);

  const setSoundCloud = useCallback(() => {
    const url = prompt("Enter SoundCloud URL");
    if (!url || !editor) return;

    editor.commands.setSoundCloud({
      src: url,
    });
  }, [editor]);

  const setVideo = useCallback(() => {
    const url = prompt("Enter Video URL");
    if (!url || !editor) return;

    editor.commands.setVideo({
      src: url,
    });
  }, [editor]);
  const setAudio = useCallback(() => {
    const url = prompt("Enter Audio URL");
    if (!url || !editor) return;

    editor.commands.setAudio({
      src: url,
    });
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="menuBar flex flex-row flex-wrap justify-start">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""}
      >
        purple
      </button>

      <div className="divided"></div>

      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
      >
        justify
      </button>
      <button onClick={() => editor.chain().focus().unsetTextAlign().run()}>unsetTextAlign</button>

      <div className="divided"></div>

      <button onClick={addImage}>Insert Image</button>

      <div className="divided"></div>
      <button onClick={addYoutubeVideo}>Insert YouTube Video</button>
      <div className="divided"></div>

      <button onClick={addVimeoVideo}>Insert Vimeo Video</button>

      <div className="divided"></div>

      <button onClick={addTwitterVideo}>Insert Twitter</button>

      <div className="divided"></div>

      <button onClick={setSoundCloud}>Insert SoundCloud Track</button>

      <div className="divided"></div>
      <button onClick={setVideo}> Insert Video</button>
      <div className="divided"></div>
      <button onClick={setAudio}> Insert Audio</button>
      <div className="divided"></div>

      <button onClick={() => editor.chain().focus().setHyperlink()}>Insert Hyperlink</button>
      <button
        onClick={() => editor.chain().focus().unsetHyperlink().run()}
        disabled={!editor.isActive("hyperlink")}
      >
        Remove Hyperlink
      </button>
    </div>
  );
};

export default MenuBar;

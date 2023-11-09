import { Editor } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
import { MediaPlacement } from "../../utils/media-placement";

// ![alt text](image_url)
// ![alt text](image_url "title")
export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

type ImageClickHandlerOptions = {
  editor: Editor;
  tooltip: any;
  tippyModal: HTMLElement;
  modal?: ((options: MediaPlacement) => void) | null;
};

export const imageClickHandler = (
  view: EditorView,
  event: MouseEvent,
  { editor, tooltip, tippyModal, modal }: ImageClickHandlerOptions
) => {
  const img = event.target as HTMLImageElement;
  if (img && img.localName === "img") {
    if (modal) modal({ editor, tooltip, tippyModal, iframe: img, wrapper: img });

    const mediaResizeGripper = img.previousSibling as HTMLElement;

    // if mediaresizeGripper does active for image, return
    if (!mediaResizeGripper) return;

    mediaResizeGripper.style.width = `${img.width}px`;
    mediaResizeGripper.style.height = `${img.height}px`;
    mediaResizeGripper.style.left = `${img.offsetLeft}px`;
    mediaResizeGripper.style.top = `${img.offsetTop}px`;
    mediaResizeGripper.classList.add("hypermultimedia__resize-gripper--active");

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target !== img) {
        removeResizeBorderAndListener();
      }
    };
    const removeResizeBorderAndListener = () => {
      mediaResizeGripper.classList.remove("hypermultimedia__resize-gripper--active");

      document.removeEventListener("click", handleClickOutside);
    };

    document.addEventListener("click", handleClickOutside);
  }
};

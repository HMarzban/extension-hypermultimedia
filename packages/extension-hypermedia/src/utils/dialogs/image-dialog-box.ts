import { mediaPlacement, MediaPlacement } from "./media-placement";

export const imageDialogBox = ({
  editor,
  tooltip,
  tippyModal,
  iframe,
  wrapper,
}: MediaPlacement): void => {
  mediaPlacement({ editor, tooltip, tippyModal, iframe, wrapper });
};

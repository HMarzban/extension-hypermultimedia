import { mediaPlacement, MediaPlacement } from "./media-placement";

export const twitterDialogBox = ({
  editor,
  tooltip,
  tippyModal,
  iframe,
  wrapper,
}: MediaPlacement): void => {
  mediaPlacement({ editor, tooltip, tippyModal, iframe, wrapper });
};

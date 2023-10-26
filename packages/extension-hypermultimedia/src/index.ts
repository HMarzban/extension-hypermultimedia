export * from "./utils/media-placement";

export * from "./hypermediaKit";

export * from "./modals/image";

export * from "./modals/youtube";

export * from "./modals/twitter";

import { HypermediaKit } from "./hypermediaKit";

import { imageModal } from "./modals/image";

import { youtubeModal } from "./modals/youtube";

import { twitterModal } from "./modals/twitter";

export const vimeoModal = youtubeModal;

export const soundCloudModal = youtubeModal;

export default {
  HypermediaKit,
  imageModal,
  youtubeModal,
  twitterModal,
};

export * from "./utils/dialogs/media-placement";

export * from "./hypermediaKit";

export * from "./utils/dialogs/image-dialog-box";

export * from "./utils/dialogs/youtube-dialog-box";

export * from "./utils/dialogs/twitter-dialog-box";

import { HypermediaKit } from "./hypermediaKit";

import { imageDialogBox } from "./utils/dialogs/image-dialog-box";

import { youtubeDialogBox } from "./utils/dialogs/youtube-dialog-box";

import { twitterDialogBox } from "./utils/dialogs/twitter-dialog-box";

import { youtubeDialogBox as soundCloudDialogBox } from "./utils/dialogs/youtube-dialog-box";

import { youtubeDialogBox as vimeoDialogBox } from "./utils/dialogs/youtube-dialog-box";

export default {
  HypermediaKit,
  imageDialogBox,
  youtubeDialogBox,
  twitterDialogBox,
  soundCloudDialogBox,
  vimeoDialogBox,
};

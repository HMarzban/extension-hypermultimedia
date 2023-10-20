export const SOUNDCLOUD_URL_REGEX =
  /^(https?:\/\/)?(www\.)?soundcloud\.com\/[A-Za-z0-9_\-]+(\/[A-Za-z0-9_\-]+)*(\/sets)?(\/[A-Za-z0-9_\-]+)?(\/?)?(\?[A-Za-z0-9_\-=&]+)?$/;
export const SOUNDCLOUD_URL_REGEX_GLOBAL =
  /^(https?:\/\/)?(www\.)?soundcloud\.com\/[A-Za-z0-9_\-]+(\/[A-Za-z0-9_\-]+)*(\/sets)?(\/[A-Za-z0-9_\-]+)?(\/?)?(\?[A-Za-z0-9_\-=&]+)?$/g;

export const isValidSoundCloudUrl = (url: string): boolean => {
  return SOUNDCLOUD_URL_REGEX.test(url);
};

export interface GetSoundCloudEmbedUrlOptions {
  url: string;
  autoPlay?: boolean;
  hideRelated?: boolean;
  showComments?: boolean;
  showUser?: boolean;
  showReposts?: boolean;
  visual?: boolean; // set to true for a video player, false for audio player
}

export const getSoundCloudEmbedUrl = (options: GetSoundCloudEmbedUrlOptions): string => {
  const { url, autoPlay, hideRelated, showComments, showUser, showReposts, visual } = options;

  const embedUrl = new URL("https://w.soundcloud.com/player/");

  // Build URL parameters
  embedUrl.searchParams.append("url", url);
  if (autoPlay) embedUrl.searchParams.append("auto_play", autoPlay ? "true" : "false");
  if (hideRelated) embedUrl.searchParams.append("hide_related", hideRelated ? "true" : "false");
  if (showComments) embedUrl.searchParams.append("show_comments", showComments ? "true" : "false");
  if (showUser) embedUrl.searchParams.append("show_user", showUser ? "true" : "false");
  if (showReposts) embedUrl.searchParams.append("show_reposts", showReposts ? "true" : "false");
  if (visual) embedUrl.searchParams.append("visual", visual ? "true" : "false");

  return embedUrl.toString();
};

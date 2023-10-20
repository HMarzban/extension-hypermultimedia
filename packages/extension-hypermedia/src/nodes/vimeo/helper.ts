export const VIMEO_REGEX = /https?:\/\/(www\.)?vimeo\.com\/\d{9}(?:$|\/|\?)/;
export const VIMEO_REGEX_GLOBAL = /https?:\/\/(www\.)?vimeo\.com\/\d{9}(?:$|\/|\?)/g;

export const isValidVimeoUrl = (url: string): boolean => {
  return VIMEO_REGEX.test(url);
};

export const getVimeoVideoId = (url: string): string | null => {
  const matches = url.match(/vimeo\.com\/(\d{9})/);
  return matches ? matches[1] : null;
};

export const getViemoVideoDetails = async (videoId: string): Promise<any> => {
  let data;
  try {
    const response = await fetch(`https://vimeo.com/api/oembed.json?url=${videoId}`);
    data = await response.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export interface GetEmbedUrlOptions {
  url: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  color?: string;
  dnt?: boolean;
  keyboard?: boolean;
  muted?: boolean;
  pip?: boolean;
  playsinline?: boolean;
  portrait?: boolean;
  quality?: string;
  speed?: boolean;
  texttrack?: string;
  title?: boolean;
  height?: number;
  width?: number;
}

export const getEmbedUrlFromVimeoUrl = (options: GetEmbedUrlOptions) => {
  const {
    url,
    autoplay,
    controls,
    loop,
    color,
    dnt,
    keyboard,
    muted,
    pip,
    playsinline,
    portrait,
    quality,
    speed,
    texttrack,
    title,
    height,
    width,
  } = options;

  if (!url) return null;

  // Check if it's already an embed URL
  if (url.includes("/video/")) {
    return url;
  }

  // Extract video ID from the URL
  const videoIdRegex = /vimeo\.com\/(\d+)/gm;
  const matches = videoIdRegex.exec(url);

  if (!matches || !matches[1]) {
    return null;
  }

  let outputUrl = `https://player.vimeo.com/video/${matches[1]}`;

  const params = [];

  if (autoplay) {
    params.push("autoplay=1");
  }

  if (controls === false) {
    params.push("controls=0");
  }

  if (loop) {
    params.push("loop=1");
  }

  if (color) {
    params.push(`color=${color.replace("#", "")}`); // Ensure color code doesn't have a #
  }

  if (dnt) {
    params.push("dnt=1");
  }

  if (keyboard === false) {
    params.push("keyboard=0");
  }

  if (muted) {
    params.push("muted=1");
  }

  if (pip) {
    params.push("pip=1");
  }

  if (playsinline) {
    params.push("playsinline=1");
  }

  if (portrait === false) {
    params.push("portrait=0");
  }

  if (quality) {
    params.push(`quality=${quality}`);
  }

  if (speed) {
    params.push("speed=1");
  }

  if (texttrack) {
    params.push(`texttrack=${texttrack}`);
  }

  if (title === false) {
    params.push("title=0");
  }

  if (height) {
    params.push(`height=${height}`);
  }

  if (width) {
    params.push(`width=${width}`);
  }

  if (params.length) {
    outputUrl += `?${params.join("&")}`;
  }

  return outputUrl;
};

export const TWITTER_URL_REGEX =
  /^(https?:\/\/)?((www|mobile)\.)?twitter\.com\/[A-Za-z0-9_]{1,15}\/status\/[0-9]+\/?$/;

export const TWITTER_URL_REGEX_GLOBAL =
  /^(https?:\/\/)?((www|mobile)\.)?twitter\.com\/[A-Za-z0-9_]{1,15}\/status\/[0-9]+\/?$/g;

export const isValidTwitterUrl = (url: string): boolean => {
  return TWITTER_URL_REGEX.test(url);
};

export const getTwitterIdFromUrl = (url: string): string => {
  const id = url.split("/").pop();

  if (!id) {
    throw new Error("Invalid Twitter URL");
  }

  return id;
};
export interface GetTwitterEmbedUrlOptions {
  url: string;
  theme?: string;
  lang?: string;
  cards?: boolean;
  conversation?: boolean;
  width?: number;
  align?: string;
  dnt?: boolean;
  dir?: string;
}

export const getTwitterEmbedUrl = (options: GetTwitterEmbedUrlOptions): string => {
  const { url, theme, lang, cards, conversation, width, align, dnt, dir } = options;

  const tweetId = getTwitterIdFromUrl(url);

  const newUrl = new URL(`https://platform.twitter.com/embed/Tweet.html`);

  // Build URL parameters
  newUrl.searchParams.append("id", tweetId);
  if (theme) newUrl.searchParams.append("theme", theme);
  if (width) newUrl.searchParams.append("width", width.toString());
  if (cards) newUrl.searchParams.append("hide_media", cards ? "false" : "true");
  if (dnt) newUrl.searchParams.append("dnt", dnt ? "true" : "false");
  if (lang) newUrl.searchParams.append("lang", lang);
  if (conversation) newUrl.searchParams.append("hide_thread", conversation ? "false" : "true");
  if (align) newUrl.searchParams.append("align", align);
  if (dir) newUrl.searchParams.append("dir", dir);

  return newUrl.toString();
};

// export const getEmbedUrlFromTwitterId = (id: string): string => {
//   const options: GetTwitterEmbedUrlOptions = { id };
//   return getTwitterEmbedUrl(options);
// };

declare global {
  interface Window {
    twttr: any; // Twitter widgets script
  }
}

export const loadTwitterScript = () => {
  if (window.twttr) {
    return Promise.resolve(window.twttr);
  }

  return new Promise((resolve, reject) => {
    // Check if the script already exists in the document
    const existingScript = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );

    if (existingScript) {
      // If the script is already loaded, resolve the promise
      // as soon as the twttr object becomes available
      const checkTwttr = setInterval(() => {
        if (window.twttr) {
          clearInterval(checkTwttr);
          resolve(window.twttr);
        }
      }, 200);
      return;
    }

    // If the script doesn't exist, create and append a new script element
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => resolve(window.twttr);
    script.onerror = reject;
    document.head.append(script);
  });
};

export const fetchOEmbedHtml = async (params: Record<string, any>) => {
  // Build the query string from the params object
  const urlParams = new URLSearchParams(params);
  const urlWithParams = `https://publish.twitter.com/oembed?${urlParams.toString()}`;

  const response = await fetch(urlWithParams);

  if (!response.ok) {
    throw new Error("Failed to fetch oEmbed HTML");
  }

  const data = await response.json();
  return data.html;
};

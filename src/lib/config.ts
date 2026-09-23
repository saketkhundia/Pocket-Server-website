/**
 * Central configuration for PocketServer landing page.
 *
 * Keep all externally-configurable URLs in one place.
 * Production values should come from environment variables.
 */

// Primary APK download URL.
// Direct download for the APK hosted in the repo:
//   https://github.com/saketkhundia/Pocket-Server/tree/main/Public
// Override with NEXT_PUBLIC_APK_DOWNLOAD_URL in production if needed.
export const APK_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL ||
  "https://github.com/saketkhundia/Pocket-Server/raw/main/Public/PocketServer.apk";

export function isApkUrlConfigured(url: string = APK_DOWNLOAD_URL): boolean {
  return (
    Boolean(url) &&
    url !== "YOUR_APK_DOWNLOAD_URL" &&
    (url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/"))
  );
}

// GitHub repository URL — override with NEXT_PUBLIC_GITHUB_URL if needed.
export const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ||
  "https://github.com/saketkhundia/Pocket-Server";

// "owner/repo" used for live release / stats lookups.
// Override with NEXT_PUBLIC_GITHUB_REPO if needed.
export const GITHUB_REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO || "saketkhundia/Pocket-Server";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://pocketserver.app";

export const SITE_NAME = "PocketServer";
export const SITE_TAGLINE = "Turn Your Android Into a Server.";

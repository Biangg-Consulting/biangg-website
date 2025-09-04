function getExtensionFromMimeType(mimeType: string): string {
  const map: Record<string, string> = {
    // Images
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "image/bmp": "bmp",
    "image/tiff": "tiff",
    "image/x-icon": "ico",
    "image/heic": "heic",
    "image/heif": "heif",
    "image/avif": "avif",

    // Videos
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/x-msvideo": "avi",
    "video/x-ms-wmv": "wmv",
    "video/webm": "webm",
    "video/mpeg": "mpeg",
    "video/3gpp": "3gp",
    "video/ogg": "ogv",
    "video/x-flv": "flv",
    "video/x-matroska": "mkv",
    "video/avi": "avi",
  };

  return map[mimeType] || "bin";
}

export async function urlToFile(
  url: string,
  baseFilename: string
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const contentType = blob.type || "image/png";

  const extension = getExtensionFromMimeType(contentType);
  const filename = `${baseFilename}.${extension}`;

  return new File([blob], filename, { type: contentType });
}

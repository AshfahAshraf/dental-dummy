/**
 * Utility for resolving image URLs or Base64 data stored in MySQL.
 * Returns null if no valid image is present.
 */

export const getImageUrl = (image?: string | null): string | null => {
  if (!image || typeof image !== "string" || !image.trim()) {
    return null;
  }

  const trimmed = image.trim();

  // Return Base64 data URIs directly
  if (trimmed.startsWith("data:image/")) {
    return trimmed;
  }

  // Return full HTTP/HTTPS URLs directly
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // If it's a relative path starting with /
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/${trimmed}`;
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.style.display = "none";
};

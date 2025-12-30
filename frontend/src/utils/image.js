const API_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (image) => {
  // Fallback image
  if (!image) return "/placeholder.jpeg";

  // If already a full URL (Cloudinary, CDN, etc.)
  if (image.startsWith("http")) {
    return image;
  }

  // If backend URL is missing (dev safety)
  if (!API_URL) {
    console.warn("VITE_API_URL is not defined");
    return "/placeholder.jpeg";
  }

  // Remove leading slashes to avoid double //
  const cleanPath = image.replace(/^\/+/, "");

  return `${API_URL}/${cleanPath}`;
};

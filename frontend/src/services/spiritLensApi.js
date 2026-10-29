
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function restoreImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `${API_BASE_URL}/api/spirit-lens/restore`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let message = `Restoration failed (${response.status}).`;

    try {
      const data = await response.json();
      message = data.error || message;
    } catch {
      // Keep the default message if the response isn't JSON.
    }

    throw new Error(message);
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.startsWith("image/")) {
    throw new Error("The backend did not return a restored image.");
  }

  const blob = await response.blob();

  if (!blob.size) {
    throw new Error("The backend returned an empty image.");
  }

  return blob;
}

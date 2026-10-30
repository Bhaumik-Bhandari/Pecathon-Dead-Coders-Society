const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:4000";

export async function fetchSkyImage(position, survey) {
  const params = new URLSearchParams({
    position,
    survey,
  });

  const response = await fetch(
    `${API_BASE_URL}/api/skyview/search?${params}`
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.error || "Unable to retrieve sky image."
    );
  }

  return data.data;
}
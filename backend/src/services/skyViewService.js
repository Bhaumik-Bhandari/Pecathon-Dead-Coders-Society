
const SKYVIEW_URL =
  "https://skyview.gsfc.nasa.gov/cgi-bin/images";

export async function getSkyImage(position, survey) {
  const params = new URLSearchParams({
    position,
    survey,
    pixels: "300,300",
    nofits: "1",
    quicklook: "jpeg",
    return: "jpeg",
  });

  const url = `${SKYVIEW_URL}?${params.toString()}`;

  console.log("SkyView request:", url);

  const response = await fetch(url, {
    headers: {
      Accept: "image/jpeg",
    },
    signal: AbortSignal.timeout(90000),
  });

  const contentType =
    response.headers.get("content-type") || "";

  console.log("NASA status:", response.status);
  console.log("NASA content type:", contentType);
  console.log("NASA final URL:", response.url);

  // Read the response body once.
  const buffer = Buffer.from(await response.arrayBuffer());

  if (!response.ok) {
    throw new Error(
      `NASA HTTP ${response.status}: ${buffer.toString("utf8").slice(0, 1000)}`
    );
  }

  if (!contentType.toLowerCase().includes("image/")) {
    const html = buffer.toString("utf8").slice(0, 1500);

    console.error("NASA HTML response:", html);

    throw new Error(
      `NASA returned ${contentType}, not an image. Response: ${html}`
    );
  }

  if (buffer.length === 0) {
    throw new Error("NASA returned an empty image.");
  }

  const imageUrl =
    `data:${contentType};base64,${buffer.toString("base64")}`;

  return {
    position,
    survey,
    source: "NASA SkyView",
    imageUrl,
    format: contentType,
  };
}



const API_URL = "https://deep-image.ai/rest_api/process_result";
const RESULT_URL = "https://deep-image.ai/rest_api/result/";

const MAX_WAIT_MS = 120_000;
const POLL_INTERVAL_MS = 1_500;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readJson(response) {
  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `Image provider returned an unexpected response (${response.status}).`
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      `Image provider request failed (${response.status}).`
    );
  }

  return data;
}

async function submitImage(imageBuffer, mimeType, apiKey) {
  const form = new FormData();

  // Node.js provides Blob and FormData in modern versions.
  form.append(
    "image",
    new Blob([imageBuffer], { type: mimeType }),
    mimeType === "image/png" ? "upload.png" : "upload.jpg"
  );

  // Ask for denoising and deblurring only.
  // Deliberately omit color changes, lighting, face enhancement,
  // and upscaling to minimize unnecessary alterations.
  const parameters = {
    enhancements: ["denoise", "deblur"],
  };

  form.append("parameters", JSON.stringify(parameters));

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
    },
    body: form,
    signal: AbortSignal.timeout(45_000),
  });

  return readJson(response);
}

async function waitForResult(initialData, apiKey) {
  let data = initialData;
  const deadline = Date.now() + MAX_WAIT_MS;

  while (true) {
    if (data.status === "complete" && data.result_url) {
      return data.result_url;
    }

    if (
      data.status === "failed" ||
      data.status === "error" ||
      data.status === "cancelled"
    ) {
      throw new Error("The AI provider could not restore this image.");
    }

    if (!data.job) {
      throw new Error(
        "The AI provider did not return a result URL or job ID."
      );
    }

    if (Date.now() >= deadline) {
      throw new Error(
        "Image processing took too long. Please try again later."
      );
    }

    await sleep(POLL_INTERVAL_MS);

    const response = await fetch(
      `${RESULT_URL}${encodeURIComponent(data.job)}`,
      {
        headers: {
          "x-api-key": apiKey,
        },
        signal: AbortSignal.timeout(15_000),
      }
    );

    data = await readJson(response);
  }
}

async function downloadRestoredImage(resultUrl) {
  const url = new URL(resultUrl);

  if (url.protocol !== "https:") {
    throw new Error("The provider returned an insecure result URL.");
  }

  const response = await fetch(url, {
    signal: AbortSignal.timeout(30_000),
    redirect: "error",
  });

  if (!response.ok) {
    throw new Error("Could not download the restored image.");
  }

  const contentType = response.headers.get("content-type") || "";

  if (!["image/png", "image/jpeg", "image/webp"].includes(
    contentType.split(";")[0].trim().toLowerCase()
  )) {
    throw new Error("The provider did not return a supported image.");
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  if (buffer.length === 0 || buffer.length > 25 * 1024 * 1024) {
    throw new Error("The restored image is empty or too large.");
  }

  return {
    buffer,
    contentType: contentType.split(";")[0].trim().toLowerCase(),
  };
}

export async function restoreAstronomyImage(imageBuffer, mimeType) {
  const apiKey = process.env.DEEP_IMAGE_API_KEY;

  if (!apiKey) {
    throw new Error("DEEP_IMAGE_API_KEY is missing from backend/.env.");
  }

  if (!imageBuffer || imageBuffer.length === 0) {
    throw new Error("The uploaded image is empty.");
  }

  if (!["image/jpeg", "image/png"].includes(mimeType)) {
    throw new Error("Only JPG and PNG images are supported.");
  }

  const initialData = await submitImage(imageBuffer, mimeType, apiKey);
  const resultUrl = await waitForResult(initialData, apiKey);

  return downloadRestoredImage(resultUrl);
}

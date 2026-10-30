import { getSkyImage } from "../services/skyViewService.js";
import { validateSkyViewInput } from "../utils/validateSkyViewInput.js";

export async function searchSky(req, res) {
  const { position, survey } = req.query;

  const validationError = validateSkyViewInput(
    position,
    survey
  );

  if (validationError) {
    return res.status(400).json({
      success: false,
      error: validationError,
    });
  }

  try {
    const result = await getSkyImage(position, survey);

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
  console.error("SkyView ERROR:", error);

  return res.status(502).json({
    success: false,
    error: error.message,
  });
}
}
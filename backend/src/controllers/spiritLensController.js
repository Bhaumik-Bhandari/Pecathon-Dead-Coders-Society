
import { restoreAstronomyImage } from "../services/spiritLensService.js";

export async function restoreImageController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Please upload an image using the 'image' field.",
      });
    }

    const restored = await restoreAstronomyImage(
      req.file.buffer,
      req.file.mimetype
    );

    res.set({
      "Content-Type": restored.contentType,
      "Content-Disposition": 'inline; filename="restored-image.png"',
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });

    return res.status(200).send(restored.buffer);
  } catch (error) {
    console.error("Spirit Lens restoration error:", error.message);

    return res.status(502).json({
      error: error.message || "The image restoration service failed.",
    });
  }
}

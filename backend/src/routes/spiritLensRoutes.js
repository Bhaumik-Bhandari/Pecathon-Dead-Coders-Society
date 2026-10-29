
import { Router } from "express";
import multer from "multer";
import { restoreImageController } from "../controllers/spiritLensController.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("Only JPG and PNG images are supported."));
    }

    callback(null, true);
  },
});

router.post(
  "/restore",
  upload.single("image"),
  restoreImageController
);

export default router;

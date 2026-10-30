import { Router } from "express";
import { searchSky } from "../controllers/skyViewController.js";

const router = Router();

router.get("/search", searchSky);

export default router;
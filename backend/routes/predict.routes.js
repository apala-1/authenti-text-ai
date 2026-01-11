import { Router } from "express";
const router = Router();

import { predictText } from "../controllers/predict.controller.js";

// POST /predict
router.post("/", predictText);

export default router;

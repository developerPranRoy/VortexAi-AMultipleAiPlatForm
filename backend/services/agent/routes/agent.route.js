import { Router } from "express";
import { agent } from "../conteollers/agent.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

// Accept an optional single file under the field name "file"
router.post("/chat", upload.single("file"), agent);

export default router;

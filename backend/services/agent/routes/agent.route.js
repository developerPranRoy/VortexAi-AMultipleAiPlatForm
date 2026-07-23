import { Router } from "express";
import { agent } from "../conteollers/agent.controller.js";


const router = Router()
router.post("/chat", agent)

export default router
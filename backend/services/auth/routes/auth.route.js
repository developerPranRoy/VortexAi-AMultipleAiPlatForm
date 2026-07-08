import { Router } from "express";
import { login, logOut } from "../controllers/auth.controller.js";

const router = Router()

router.post("/login", login)
router.get("/logout", logOut)

export default router

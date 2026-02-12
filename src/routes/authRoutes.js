import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// route for creating a user
router.post("/register", register);
router.post("/login", login);

export default router;

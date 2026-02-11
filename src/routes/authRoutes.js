import express from "express";
import { register } from "../controllers/authController.js";

const router = express.Router();

// route for creating a user
router.post("/register", register);

export default router;

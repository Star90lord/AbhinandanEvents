import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  checkAuth,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Email verification
router.get("/verify/:token", verifyEmail);

// Check authenticated user
router.get("/me", checkAuth);

// Forgot password (send reset email)
router.post("/forgot-password", forgotPassword);

// Reset password (using token)
router.post("/reset-password/:token", resetPassword);

export default router;
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
} from "../mailtrap/emails.js";

const createError = (status, message) => {
  const err = new Error(message);
  err.statusCode = status;
  return err;
};

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw createError(400, "Name, email, and password are required");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw createError(400, "An account with this email already exists");

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24h
    });

    await sendVerificationEmail(user.email, user.name, verificationToken);
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      message: "Signup successful. Check your email to verify your account.",
      user: { id: user._id, name: user.name, email: user.email, isVerified: user.isVerified },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw createError(400, "Email and password are required");

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw createError(400, "Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createError(400, "Invalid email or password");

    generateTokenAndSetCookie(res, user._id);
    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, isVerified: user.isVerified },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (_req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) throw createError(400, "Invalid or expired verification link");

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};

const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) throw createError(401, "Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("name email isVerified createdAt");
    if (!user) throw createError(404, "User not found");

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiresAt = Date.now() + 1000 * 60 * 30; // 30 min
      await user.save();

      await sendPasswordResetEmail(user.email, user.name, resetToken);
    }

    res.json({ message: "If that email exists, we have sent reset instructions." });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) throw createError(400, "Invalid or expired reset link");

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendPasswordResetSuccessEmail(user.email, user.name);
    res.json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

export {
  signup,
  login,
  logout,
  verifyEmail,
  checkAuth,
  forgotPassword,
  resetPassword,
};
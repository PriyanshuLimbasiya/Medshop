const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const {
  generateVerificationToken,
} = require("../utils/generateVerificationToken");
const {
  sendVerificationEmail,
  sendForgotPasswordEmail,
  sendResetSuccessEmail,
} = require("../mail/sendVerifcationEmail");
const TokenModel = require("../models/Token.model");

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const token = generateVerificationToken();

    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
    });

    await user.save();
    const verificationToken = await TokenModel.create({
      user: user,
      token: token,
      expiry: Date.now() + 15 * 60 * 1000,
      type: "verification",
    });

    generateToken(res, user._id); // Generate the token and send it as a response

    sendVerificationEmail(user.email, verificationToken.token);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verification = async (req, res) => {
  const { code } = req.body;
  try {
    const token = await TokenModel.findOne({
      user: req.user,
      type: "verification",
      token: code,
      expiry: { $gt: Date.now() },
    });
    if (!token) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    req.user.isVerified = true;

    await req.user.save();
    await token.deleteOne();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...req.user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Creditentials" });
    }
    const isPassword = await bcryptjs.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Creditentials" });
    }
    generateToken(res, user._id);
    user.lastlogin = new Date();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Login Error", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const token = generateVerificationToken();
    const resetToken = await TokenModel.create({
      user: user,
      token: token,
      expiry: Date.now() + 15 * 60 * 1000,
      type: "resetPassword",
    });

    sendForgotPasswordEmail(
      user.email,
      `${process.env.RESET_URL}/forgot-password/${resetToken.token}`
    );
    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log("Reset Password Error", error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const resetToken = await TokenModel.findOne({
      user: user,
      token: token,
      expiry: { $gt: Date.now() },
      type: "resetPassword",
    });
    if (!resetToken) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    await resetToken.deleteOne();

    sendResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {}
};

const checkAuth = async (req, res) => {
  try {   
    res
      .status(200)
      .json({ success: true, user: { ...req.user._doc, password: undefined } });
  } catch (error) {
    console.error("Error checking authentication:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Exporting the functions using CommonJS
module.exports = {
  signup,
  login,
  logout,
  verification,
  forgotPassword,
  resetPassword,
  checkAuth,
};

const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const {generateVerificationToken,} = require("../utils/generateVerificationToken");
const {sendVerificationEmail,sendForgotPasswordEmail,} = require("../mail/sendVerifcationEmail");

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
    const verificationToken = generateVerificationToken();

    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    });

    await user.save();

    generateToken(res, user._id); // Generate the token and send it as a response

    await sendVerificationEmail(user.email, verificationToken);

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
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpireAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
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
    if (!password) {
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
    const resetToken = generateVerificationToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpireAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour
    await user.save();
    await sendForgotPasswordEmail(
      user.email,
      `${process.env.RESET_URL}/forgot-password/${resetToken}`
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
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpireAt: { $gt: Date.now() },
    });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpireAt = undefined;
    await user.save();
    await sendResetSuccessEmail(user.email); 
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      user: {
        ...user.doc,
        password: undefined,
      },
    });
  } catch (error) {}
};

const checkAuth = async (req, res) => {
  try {
    console.log("Checking authentication for userId:", req.userId); // ✅ Debugging

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
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
  checkAuth
};

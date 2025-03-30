const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    // Get token from either cookies or headers
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userid) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    // Find user in DB
    const user = await UserModel.findById(decoded.userid);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user; // Attach user to request
    next(); // Proceed to next middleware
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = verifyToken;

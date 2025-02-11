const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
require("dotenv").config();

const verifyToken = async(req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    jwt.verify(token,process.env.JWT_SECRET, async (err, decoded) => {
			if (err) {
				return res.status(403).json({ message: err.message })
			} else {
				req.user = await UserModel.findById(decoded.userid)
				next();
			}
		}) 
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = verifyToken;

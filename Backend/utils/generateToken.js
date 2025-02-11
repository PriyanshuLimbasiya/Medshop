const jwt = require("jsonwebtoken");

const generateToken = (res, userid) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, 
    { algorithm: "HS256", expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",  // Set secure cookie for non-development
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000  // 2 days
  });

  return token;
};

// Export using CommonJS
module.exports = { generateToken };

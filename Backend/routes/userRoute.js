const express = require("express");
const {
  signup,
  logout,
  login,
  verification,
  forgotPassword,
  resetPassword,
  checkAuth,
} = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verification", verification);

router.post("/forgotpassword", forgotPassword);

router.post("/resetpassword/:token", resetPassword);

module.exports = router;

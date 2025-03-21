const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {


    email:
      { type: String, required: true, unique: true },

    password:
      { type: String, required: true },

    name:
      { type: String, required: true },

    lastlogin:
      { type: Date, default: Date.now },

    isVerified:
      { type: Boolean, default: false },

    isAdmin:
      { type: Boolean, default: false }

  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const cors=require('cors');

dotenv.config();
  
connectDB() // Connect to the database
  .then(() => {
    // If DB connection is successful, set up the Express app
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use("/api/auth", userRoute);
    

    // Start the server
    app.listen(process.env.PORT || 5000, () => {
      console.log("🚀 Server running");
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

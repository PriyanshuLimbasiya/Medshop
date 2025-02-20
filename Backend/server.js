const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const medicineRoute = require('./routes/medicineRoute')

dotenv.config();

connectDB() // Connect to the database
  .then(() => {
    const app = express();
    app.use(cookieParser());
    app.use(cors({
      credentials: true,
      origin: "http://localhost:5173"
    }));
    app.use(express.json());

    app.use("/api/auth", userRoute);
const verifyToken = require("./middleware/verifyToken");

// Public route (no authentication needed)
app.use("/api/auth", userRoute);

// Protected route (only accessible after login)
app.use("/api/medicine", verifyToken, medicineRoute); 

    // Start the server
    app.listen(process.env.PORT || 5000, () => {
      console.log("🚀 Server running");
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const userRoute = require("./routes/userRoute");
const purchaseRoute = require("./routes/purchaseRoute");
const supplierRoute=require("./routes/supplierRoute");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const medicineRoute = require('./routes/medicineRoute')

dotenv.config();

connectDB()
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


    app.use("/api/auth", userRoute);

    app.use("/api/medicine", verifyToken, medicineRoute);
    app.use("/api/purchase", verifyToken, purchaseRoute);
    app.use("/api/supplier", verifyToken,supplierRoute);

    app.listen(process.env.PORT || 5000, () => {
      console.log("🚀 Server running");
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

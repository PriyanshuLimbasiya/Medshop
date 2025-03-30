const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model"); // Adjust path if needed

dotenv.config();

const createAdmin = async () => {
    const uri = process.env.MONGO_URI
    try {

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Database connected...");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("⚠️ Admin already exists:", existingAdmin.email);
            return;
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash("securepass", 10);

        // Create Admin User
        const newUser = new User({
            email: "admin@example.com",
            password: hashedPassword,
            name: "Admin User",
            role: "admin",
        });

        await newUser.save();
        console.log("✅ Admin created successfully:", newUser);

    } catch (error) {
        console.error("❌ Error creating admin:", error);
    } finally {
        mongoose.disconnect();
        console.log("🔌 Disconnected from database");
    }
};

// Run the function
createAdmin();

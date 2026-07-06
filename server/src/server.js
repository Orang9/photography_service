import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import pool from "./config/mysql.js";
import connectMongoDB from "./config/mongo.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Verify MySQL database connection
    console.log("Verifying MySQL database connection...");
    await pool.query("SELECT 1");
    console.log("✅ MySQL database connection verified");

    // 2. Connect to MongoDB gracefully
    console.log("Connecting to MongoDB...");
    try {
      await connectMongoDB();
    } catch (mongoError) {
      console.warn("⚠️ MongoDB failed to connect. Features relying on Mongo may be unavailable.");
      // We don't exit here so the app doesn't crash if MongoDB is unreachable
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

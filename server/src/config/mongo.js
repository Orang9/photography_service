import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // Set up connection event listeners before connecting
    mongoose.connection.on("connected", () => {
      console.log("✅ Terhubung ke MongoDB Atlas melalui Mongoose");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    // Connect with a timeout to prevent hanging startup
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (err) {
    console.error("❌ Gagal koneksi ke Atlas:", err.message);
    // Rethrow the error so it can be handled by server.js gracefully
    throw err;
  }
};

export default connectMongoDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectMongoDB = async () => {
  try {
    // Pastikan MONGODB_URI di .env sudah benar (format: mongodb+srv://...)
    const uri = process.env.MONGODB_URI;

    console.log(uri);

    await mongoose.connect(uri);

    console.log("✅ Terhubung ke MongoDB Atlas melalui Mongoose");
  } catch (err) {
    console.error("❌ Gagal koneksi ke Atlas:", err.message);
    process.exit(1);
    a;
  }
};

export default connectMongoDB;

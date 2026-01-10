import { MongoClient } from 'mongodb';

// Ganti <password> dengan password user database Atlas Anda
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db('photography_serviceDB');
    console.log("Terhubung ke MongoDB Atlas");
  } catch (err) {
    console.error("Gagal koneksi ke Atlas:", err);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
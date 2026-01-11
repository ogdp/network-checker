// api/ping.js
import { MongoClient } from "mongodb";

// 🔧 Kết nối MongoDB (dùng global cache để tránh reconnect nhiều lần)
const uri =
  "mongodb+srv://ducmynguyen502_db_user:T0rAxZlDgCTSbibt@network-checker.ukvm7r9.mongodb.net/?appName=network-checker";
if (!global._mongoClientPromise) {
  const client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
const clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("network-checker");
    const collection = db.collection("pings");

    const timestamp = Math.floor(Date.now() / 1000);
    await collection.updateOne(
      { device: "room" },
      { $set: { lastPing: timestamp } },
      { upsert: true }
    );

    res.status(200).json({ message: "pong", time: timestamp });
  } catch (err) {
    console.error("Ping error:", err);
    res.status(500).json({
      error: "Không ghi được dữ liệu vào MongoDB",
      details: err.message,
    });
  }
}

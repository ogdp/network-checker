// api/status.js
import { MongoClient } from "mongodb";

// 🔧 Dùng chung cache kết nối với ping.js
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

    const record = await collection.findOne({ device: "room" });
    const now = Math.floor(Date.now() / 1000);
    const lastPing = record?.lastPing || 0;
    const diff = now - lastPing;
    const online = diff < 60;

    res.status(200).json({ status: online ? "Online" : "Offline", diff });
  } catch (err) {
    console.error("Status error:", err);
    res.status(500).json({ status: "Offline", error: err.message });
  }
}

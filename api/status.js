// api/status.js
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../__config";

let client;
let clientPromise;

async function connectDB() {
  if (!clientPromise) {
    client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export default async function handler(req, res) {
  try {
    const client = await connectDB();
    const db = client.db("network-checker");
    const collection = db.collection("pings");

    const record = await collection.findOne({ device: "room" });
    const now = Math.floor(Date.now() / 1000);
    const lastPing = record?.lastPing || 0;
    const diff = now - lastPing;
    const online = diff < 15; // Thay đổi từ 60s sang 15s (3 lần ping bỏ lỡ)

    res.status(200).json({ status: online ? "Online" : "Offline", diff });
  } catch (err) {
    console.error("Status error:", err);
    res.status(500).json({ status: "Offline", error: err.message });
  }
}

// XÓA dòng test local này khi deploy lên Vercel
// handler({}, { status: () => ({ json: console.log }) });

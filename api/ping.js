// api/ping.js
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://ducmynguyen502_db_user:T0rAxZlDgCTSbibt@network-checker.ukvm7r9.mongodb.net/?appName=network-checker";

let client;
let clientPromise;

async function connectDB() {
  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export default async function handler(req, res) {
  try {
    const client = await connectDB();
    const db = client.db("network-checker");
    const collection = db.collection("pings");

    const timestamp = Math.floor(Date.now() / 1000);
    await collection.updateOne(
      { device: "room" },
      { $set: { lastPing: timestamp } },
      { upsert: true }
    );

    console.log("Ping thành công:", timestamp);
  } catch (err) {
    console.error("Ping error:", err);
  }
}

// Nếu bạn chạy file trực tiếp (node ping.js)
handler({}, { status: () => ({ json: console.log }) });

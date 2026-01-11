// api/status.js
const { MongoClient } = require("mongodb");

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

module.exports = async function (req, res) {
  try {
    const client = await connectDB();
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
};

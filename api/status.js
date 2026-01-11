// api/status.js
import { lastPing } from "./ping.js";

export default function handler(req, res) {
  const now = Date.now();
  const diff = (now - lastPing) / 1000;
  const online = diff < 60; // nếu ping trong vòng 60s gần nhất => Online
  res.status(200).json({ status: online ? "Online" : "Offline" });
}

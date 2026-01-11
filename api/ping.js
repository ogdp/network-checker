// api/ping.js
let lastPing = Date.now();

export default function handler(req, res) {
  lastPing = Date.now();
  res.status(200).json({ message: "pong" });
}

export { lastPing };

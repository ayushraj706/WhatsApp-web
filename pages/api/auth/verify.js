export default function handler(req, res) {
  const { secret } = req.body;
  if (secret === process.env.ADMIN_SECRET) {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ error: "Invalid Secret" });
}

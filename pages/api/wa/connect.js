import { connectToWhatsApp } from '../../../lib/wa-logic';

export default async function handler(req, res) {
  const { email, method, phone } = req.body; // method: 'qr' or 'pairing'

  try {
    if (method === 'pairing') {
      const result = await connectToWhatsApp(email, true, phone);
      return res.status(200).json({ success: true, pairingCode: result.pairingCode });
    } else {
      // QR logic trigger
      await connectToWhatsApp(email);
      return res.status(200).json({ success: true, message: "QR Engine Started" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


import db from '../../../lib/firebase-admin';

export default async function handler(req, res) {
  const { email } = req.query;

  try {
    // Firestore se session check karo
    const sessionDoc = await db.collection('wa_sessions').doc(email).get();

    if (sessionDoc.exists) {
      const data = sessionDoc.data();
      // Agar credentials file exists karti hai toh connected maano
      return res.status(200).json({ 
        connected: true, 
        pushName: data.pushName || 'Active Node' 
      });
    }

    return res.status(200).json({ connected: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

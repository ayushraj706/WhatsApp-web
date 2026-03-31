export default async function handler(req, res) {
  try {
    // Apne Render ka URL yahan daalein
    const response = await fetch('https://whatsapp-web-2-in-one.onrender.com');
    if (response.ok) {
      res.status(200).json({ message: 'Render service ko jaga diya gaya hai!' });
    } else {
      res.status(500).json({ message: 'Ping fail ho gaya' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


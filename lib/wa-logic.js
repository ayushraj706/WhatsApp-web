import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import db from './firebase-admin';

export const connectToWhatsApp = async (userEmail) => {
  // 1. Session Persistence Logic
  const { state, saveCreds } = await useMultiFileAuthState(`sessions/${userEmail}`);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    browser: ["BaseKey OS", "Chrome", "1.0.0"]
  });

  sock.ev.on('creds.update', saveCreds);

  // 2. ANTI-DELETE & MESSAGE LOGGING LOGIC
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message) return;

    const messageId = m.key.id;
    const remoteJid = m.key.remoteJid;
    const content = m.message.conversation || m.message.extendedTextMessage?.text || "Media/Other";

    // Har message ko Firestore mein save karo
    await db.collection('chats').doc(userEmail).collection('messages').doc(messageId).set({
      messageId,
      sender: remoteJid,
      text: content,
      timestamp: Date.now(),
      fromMe: m.key.fromMe,
      isDeleted: false // Default: Not deleted
    }, { merge: true });
  });

  // 3. DETECT DELETED MESSAGES (Protocol Message)
  sock.ev.on('messages.update', async (updates) => {
    for (const update of updates) {
      if (update.update.message === null) { // WhatsApp protocol for deleted message
        const deletedId = update.key.id;
        
        // Database mein is message ko "Deleted" mark kar do
        await db.collection('chats').doc(userEmail).collection('messages').doc(deletedId).update({
          isDeleted: true,
          deletedAt: Date.now()
        });
        
        console.log(`Neural Alert: Message ${deletedId} was deleted by sender.`);
      }
    }
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) connectToWhatsApp(userEmail);
    }
  });

  return sock;
};

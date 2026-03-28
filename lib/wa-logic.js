import makeWASocket, { useMultiFileAuthState, DisconnectReason, delay } from '@whiskeysockets/baileys';
import pino from 'pino';
import admin from './firebase-admin';

const db = admin.firestore();

export const connectToWhatsApp = async (userEmail, usePairingCode = false, phoneNumber = "") => {
  // Session storage logic in Firestore
  const sessionDoc = db.collection('wa_sessions').doc(userEmail);
  
  const { state, saveCreds } = await useMultiFileAuthState(`sessions/${userEmail}`);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    browser: ["BaseKey OS", "Chrome", "1.0.0"]
  });

  // Pairing Code Logic
  if (usePairingCode && !sock.authState.creds.registered) {
    await delay(3000); // Wait for socket
    const code = await sock.requestPairingCode(phoneNumber);
    return { pairingCode: code };
  }

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      // Send QR back to frontend via some state or socket
      console.log("QR Generated:", qr);
    }
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) connectToWhatsApp(userEmail);
    }
    console.log('Connection Status:', connection);
  });

  // ANTI-DELETE LOGIC: Save every incoming message to DB
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.key.fromMe) {
      await db.collection('logs').doc(userEmail).collection('messages').add({
        sender: m.key.remoteJid,
        content: m.message?.conversation || m.message?.extendedTextMessage?.text,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        isDeleted: false
      });
    }
  });

  return sock;
};
  

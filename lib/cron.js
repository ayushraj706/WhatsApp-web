const https = require('https');

// Aapka Render URL
const URL = 'https://whatsapp-web-ijkc.onrender.com';

function startPing() {
  console.log("Neural Ping Engine: Started");

  // Har 10 minute (600,000 ms) mein chalega
  setInterval(() => {
    https.get(URL, (res) => {
      console.log(`[${new Date().toLocaleTimeString()}] Ping Sent: ${res.statusCode === 200 ? 'SUCCESS' : 'STATUS ' + res.statusCode}`);
    }).on('error', (err) => {
      console.error(`[${new Date().toLocaleTimeString()}] Ping Failed: ${err.message}`);
    });
  }, 600000); 
}

// Global variable taaki baar-baar start na ho
if (process.env.NODE_ENV === 'production') {
  startPing();
}

module.exports = startPing;

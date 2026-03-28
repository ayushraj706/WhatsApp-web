# WhatsApp-web

# 🛡️ BaseKey Business OS v2.0 - Neural Edition
> **Samastipur to Global:** The most powerful Open-Source WhatsApp Automation Engine with Ghost Logging and AI Autopilot.

![BaseKey Banner](https://img.shields.io/badge/BaseKey-Business--OS-00A884?style=for-the-badge&logo=whatsapp&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-v20.x-green?style=for-the-badge&logo=node.js)
![Next.js](https://img.shields.io/badge/Next.js-v14-black?style=for-the-badge&logo=next.js)

---

## 🌌 Project Vision
BaseKey Business OS is not just a chatbot; it's a complete **Operating System for Businesses**. It bypasses the 24-hour Meta session limit and provides advanced features like **Anti-Delete Protocol**, **Neural 2FA**, and **Interactive Button Messaging**—all for free.

---

## 🚀 Key Features

### 👻 Ghost Logging (Anti-Delete)
* **Real-time Fragment Preservation:** Every incoming message is instantly mirrored to the Neural Firestore.
* **Protocol Detection:** Automatically detects when a sender uses "Delete for Everyone" and marks the fragment as `isDeleted: true` in your dashboard.
* **Immutable Logs:** Once a message hits BaseKey, it stays in BaseKey forever.

### 🔘 Interactive Button Engine
* **Reply Buttons:** Send professional 3-button reply messages without any Meta approval.
* **CTA Buttons:** Integrate URL and Call buttons directly into your chat flows.
* **No Session Limit:** Send button messages to clients even after months of inactivity.

### 🧠 Neural AI Integration
* **Gemini Autopilot:** Powered by Google's Generative AI to understand business context and reply automatically.
* **Contextual Awareness:** Remembers previous interactions to provide human-like responses.

### 🔒 Enterprise Security
* **Neural 2FA:** Secondary identity verification via Telegram/WhatsApp OTP sequences.
* **Cloudflare Turnstile:** Protection against bot traffic and unauthorized dashboard access.

---

## 🛠️ Technical Architecture



| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14 / Tailwind CSS | High-speed, responsive Meta-style UI. |
| **Backend Engine** | Baileys (@whiskeysockets) | Direct Socket connection to WhatsApp Web. |
| **Database** | Firebase Firestore | Persistent session storage and message logging. |
| **Automation** | Node.js Cron | Keep-alive ping engine to prevent Render sleep. |
| **Icons** | Lucide-React | Crisp, modern neural-themed iconography. |

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/ayushraj706/WhatsApp-web.git](https://github.com/ayushraj706/WhatsApp-web.git)
cd WhatsApp-web

npm install
# or
yarn install
FIREBASE_SERVICE_ACCOUNT='{"your_full_json_here"}'
NEXT_PUBLIC_ADMIN_EMAIL='your@email.com'
GEMINI_API_KEY='your_api_key'


BaseKey-OS/
├── components/          # Reusable UI Nodes
│   ├── wa/              # WhatsApp specific components
│   └── settings/        # 2FA and Security modules
├── lib/                 # Core Neural Logic
│   ├── firebase-admin.js# DB Connection
│   └── wa-logic.js      # Baileys Socket Handler
├── pages/               # Application Routes
│   ├── api/             # Serverless Functions
│   └── dashboard/       # Main Admin Control Center
├── public/              # Static Assets
└── styles/              # Global CSS & Tailwind configs



Security Protocol
BaseKey uses a Dual-Node Authentication system. Even if your GitHub is public, your credentials stay safe in the Environment Variables of your hosting provider (Render/Vercel).


 Roadmap
[x] QR & Pairing Code Integration
[x] Anti-Delete Ghost Logging
[x] Neural 2FA Security Layer
[ ] Multi-Agent CRM Inbox (Work in Progress)
[ ] Excel/PDF Bulk Export Logic
[ ] Drag-and-Drop Workflow Builder


Contribution
Contributions are what make the open-source community an amazing place to learn, inspire, and create.
Fork the Project
Create your Feature Branch (git checkout -b feature/NeuralFeature)
Commit your Changes (git commit -m 'Add some NeuralFeature')
Push to the Branch (git push origin feature/NeuralFeature)
Open a Pull Request




Developer
Ayush Raj
Grade: 10th Student
Location: Samastipur, Bihar
Vision: Building the future of business communication.



License
Distributed under the MIT License. See LICENSE for more information.
Built with ❤️ and Neural Logic by Ayush Raj.



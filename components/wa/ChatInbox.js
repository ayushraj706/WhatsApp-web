import React, { useState, useEffect } from 'react';
import db from '../../lib/firebase-admin-client'; // Aapka client-side firebase config
import { Trash2, ShieldAlert, Clock } from 'lucide-react';

export default function ChatInbox({ userEmail }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userEmail) return;

    // Real-time listener: Jaise hi DB mein naya message aayega ya delete hoga, UI update hoga
    const unsubscribe = db.collection('chats')
      .doc(userEmail)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .onSnapshot((snapshot) => {
        const msgData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(msgData);
      });

    return () => unsubscribe();
  }, [userEmail]);

  return (
    <div className="flex flex-col h-full bg-[#080808] p-4 font-sans">
      <h2 className="text-xl font-black text-white mb-6 uppercase italic tracking-tighter">
        Neural <span className="text-[#00A884]">Anti-Delete Logs</span>
      </h2>

      <div className="space-y-4 overflow-y-auto pr-2">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`p-4 rounded-2xl border transition-all ${
              msg.isDeleted 
                ? 'bg-red-500/5 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]' 
                : 'bg-[#111] border-white/5'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                From: {msg.sender.split('@')[0]}
              </span>
              
              {/* --- YE HAI ASLI MAGIC --- */}
              {msg.isDeleted ? (
                <div className="flex items-center gap-1 text-red-500 animate-pulse">
                  <ShieldAlert size={12} />
                  <span className="text-[9px] font-black uppercase tracking-tighter">Sender Deleted This</span>
                </div>
              ) : (
                <span className="text-[9px] text-zinc-600 flex items-center gap-1 uppercase font-bold">
                  <Clock size={10} /> {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>

            <p className={`text-sm ${msg.isDeleted ? 'text-zinc-400 italic' : 'text-zinc-200'}`}>
              {msg.text}
            </p>

            {msg.isDeleted && (
              <div className="mt-3 pt-3 border-t border-red-500/10 flex items-center gap-2">
                <Trash2 size={10} className="text-red-500/50" />
                <span className="text-[8px] text-red-500/50 font-bold uppercase">Original fragment preserved by BaseKey Engine</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

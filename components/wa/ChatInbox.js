import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import db from '../../lib/firebase-client'; // Corrected Path
import { Trash2, ShieldAlert, Clock, SearchX } from 'lucide-react';

export default function ChatInbox({ userEmail, searchQuery = "" }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return;

    // Neural Firestore Query
    // Note: 'wa_logs' is the collection name we used in wa-logic.js
    const q = query(
      collection(db, "wa_logs", userEmail, "messages"),
      orderBy("timestamp", "desc"),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgData);
      setLoading(false);
    }, (error) => {
      console.error("Neural Link Sync Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userEmail]);

  // --- SEARCH LOGIC: Filtering fragments locally for speed ---
  const filteredMessages = messages.filter(msg => 
    msg.text?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    msg.sender?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-600 animate-pulse text-[10px] font-black uppercase tracking-[0.3em]">
        Decrypting Fragments...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#080808] p-4 font-sans selection:bg-[#00A884]/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
          Neural <span className="text-[#00A884]">Anti-Delete Logs</span>
        </h2>
        <span className="text-[9px] bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full font-bold">
          {filteredMessages.length} Fragments Found
        </span>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`p-5 rounded-[1.5rem] border transition-all duration-500 ${
                msg.isDeleted 
                  ? 'bg-red-500/[0.03] border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]' 
                  : 'bg-[#111]/50 border-white/5 hover:border-[#00A884]/30'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Source Node
                  </span>
                  <span className="text-sm font-bold text-zinc-300">
                    {msg.sender?.split('@')[0]}
                  </span>
                </div>
                
                {msg.isDeleted ? (
                  <div className="flex items-center gap-1.5 text-red-500 animate-pulse bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                    <ShieldAlert size={12} />
                    <span className="text-[9px] font-black uppercase tracking-tighter italic">Ghost Log Preserved</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-zinc-600 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-800">
                    <Clock size={10} /> 
                    <span className="text-[9px] uppercase font-black">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>

              <div className="relative">
                <p className={`text-sm leading-relaxed ${msg.isDeleted ? 'text-zinc-400 italic' : 'text-zinc-200'}`}>
                  {msg.text}
                </p>
              </div>

              {msg.isDeleted && (
                <div className="mt-4 pt-4 border-t border-red-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trash2 size={10} className="text-red-500/50" />
                    <span className="text-[8px] text-red-500/50 font-black uppercase tracking-widest">
                      Sender attempted deletion • Fragment Locked
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-zinc-700 space-y-4">
            <SearchX size={40} strokeWidth={1} />
            <p className="text-[10px] font-black uppercase tracking-widest">No matching neural logs found.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1c1c1c; border-radius: 10px; }
      `}</style>
    </div>
  );
}

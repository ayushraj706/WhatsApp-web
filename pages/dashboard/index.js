import React, { useState, useEffect } from 'react';
import LinkDevice from '../../components/wa/LinkDevice';
import ChatInbox from '../../components/wa/ChatInbox';
import { Layout, MessageSquare, Link, Settings, Shield, Search, Bell } from 'lucide-react';

export default function Dashboard() {
  const [isLinked, setIsLinked] = useState(false);
  const [syncing, setSyncing] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const userEmail = "ayushrajayushhh@gmail.com"; // Isse dynamic bhi kar sakte hain

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/wa/status?email=${userEmail}`);
        const data = await res.json();
        if (data.connected) setIsLinked(true);
      } catch (err) { console.error("Status check failed"); }
      finally { setSyncing(false); }
    };
    checkStatus();
  }, []);

  if (syncing) return <div className="h-screen bg-[#080808] flex items-center justify-center text-blue-500 font-bold uppercase tracking-widest text-xs">Initialising BaseKey OS...</div>;

  return (
    <div className="flex h-screen bg-[#F0F2F5] font-sans">
      
      {/* Sidebar - WhatsApp Web Style */}
      <div className="w-16 md:w-64 bg-[#1C1E21] text-white flex flex-col items-center py-6">
        <div className="flex items-center gap-3 mb-10 px-4">
          <div className="bg-[#00A884] p-2 rounded-lg"><Shield size={20} /></div>
          <h1 className="hidden md:block font-black tracking-tighter text-xl uppercase italic">BaseKey</h1>
        </div>
        
        <nav className="flex-1 w-full space-y-2 px-2">
          <button className="flex items-center gap-4 w-full p-3 rounded-xl bg-[#00A884]/10 text-[#00A884] font-bold text-sm">
            <MessageSquare size={18} /> <span className="hidden md:block">Neural Logs</span>
          </button>
          <button className="flex items-center gap-4 w-full p-3 rounded-xl text-gray-400 hover:bg-white/5 font-bold text-sm">
            <Link size={18} /> <span className="hidden md:block">Linked Devices</span>
          </button>
          <button className="flex items-center gap-4 w-full p-3 rounded-xl text-gray-400 hover:bg-white/5 font-bold text-sm">
            <Settings size={18} /> <span className="hidden md:block">Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header with Search */}
        <header className="h-16 bg-white border-b border-[#DDD] px-6 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search deleted fragments or senders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-[#F5F6F7] border-none rounded-lg pl-10 text-sm focus:ring-1 focus:ring-[#00A884]"
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell size={18} className="text-gray-400 cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center font-bold text-xs text-white">AR</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {!isLinked ? (
            <div className="animate-in slide-in-from-bottom duration-700">
               <LinkDevice email={userEmail} />
            </div>
          ) : (
            <div className="h-full">
               <ChatInbox userEmail={userEmail} searchQuery={searchQuery} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
        }
    

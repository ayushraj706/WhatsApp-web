import { useState } from 'react';
import { useRouter } from 'next/router';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Login() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // API call to verify secret against environment variable
    const res = await fetch('/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ secret }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      localStorage.setItem('basekey_session', 'authenticated');
      router.push('/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="h-screen bg-[#080808] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#111] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#00A884]/10 p-4 rounded-3xl mb-4">
            <ShieldCheck className="text-[#00A884]" size={40} />
          </div>
          <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">BaseKey OS</h1>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mt-2 text-center">Neural Access Protocol</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input 
              type="password" 
              placeholder="ENTER SECRET KEY" 
              className={`w-full h-14 bg-black border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl pl-12 text-white font-mono text-sm tracking-widest focus:ring-1 focus:ring-[#00A884] transition-all`}
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <button className="w-full h-14 bg-[#00A884] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#00c59b] transition-all shadow-[0_0_20px_rgba(0,168,132,0.2)]">
            Verify Node
          </button>
        </form>
      </div>
    </div>
  );
        }

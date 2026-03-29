import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if admin is already authenticated
    const authStatus = localStorage.getItem('basekey_session');
    if (authStatus === 'authenticated') {
      router.push('/dashboard');
    } else {
      router.push('/dashboard');
    }
  }, []);

  return (
    <div className="h-screen bg-[#080808] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#00A884] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
          Loading BaseKey OS...
        </p>
      </div>
    </div>
  );
}


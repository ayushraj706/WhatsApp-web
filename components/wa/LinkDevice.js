import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Real QR Generator
import { Smartphone, QrCode, Loader2 } from 'lucide-react';

export default function LinkDevice({ email }) {
  const [method, setMethod] = useState('qr');
  const [qrString, setQrString] = useState(''); // Asli QR string yahan aayegi
  const [loading, setLoading] = useState(false);

  // QR Fetching Logic
  useEffect(() => {
    if (method === 'qr') {
      const fetchQR = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/wa/connect?email=${email}&method=qr`);
          const data = await res.json();
          if (data.qr) setQrString(data.qr); // Backend se aayi string
        } catch (err) { console.error("QR Fetch Failed"); }
        finally { setLoading(false); }
      };
      fetchQR();
      
      // Har 30 sec mein QR refresh hoga
      const interval = setInterval(fetchQR, 30000);
      return () => clearInterval(interval);
    }
  }, [method, email]);

  return (
    <div className="bg-white rounded-[2rem] border border-[#DDD] p-8 md:p-12 shadow-2xl max-w-4xl mx-auto animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-black tracking-tight text-[#1C1E21]">Link BaseKey OS</h2>
          <div className="space-y-4">
            {[
              "Open WhatsApp on your mobile node",
              "Access Menu/Settings > Linked Devices",
              "Select 'Link a Device'",
              "Scan the Neural Fragment on the right"
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-center">
                <span className="w-6 h-6 rounded-full bg-[#00A884]/10 text-[#00A884] flex items-center justify-center text-xs font-bold">{i+1}</span>
                <p className="text-sm text-[#606770] font-medium">{step}</p>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2 p-1 bg-[#F5F6F7] rounded-xl w-fit border border-[#DDD]">
            <button onClick={() => setMethod('qr')} className={`px-6 py-2.5 rounded-lg text-xs font-black transition-all ${method === 'qr' ? 'bg-white shadow-md text-[#00A884]' : 'text-gray-400'}`}>QR CODE</button>
            <button onClick={() => setMethod('pairing')} className={`px-6 py-2.5 rounded-lg text-xs font-black transition-all ${method === 'pairing' ? 'bg-white shadow-md text-[#00A884]' : 'text-gray-400'}`}>PAIRING CODE</button>
          </div>
        </div>

        {/* --- REAL QR DISPLAY --- */}
        <div className="w-72 h-72 bg-white rounded-3xl flex items-center justify-center border-2 border-[#00A884]/20 shadow-inner relative p-6">
          {loading && !qrString ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-[#00A884]" size={40} />
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Generating Node...</p>
            </div>
          ) : qrString ? (
            <div className="animate-in zoom-in duration-500">
              <QRCodeSVG value={qrString} size={220} level="H" includeMargin={false} />
            </div>
          ) : (
            <div className="text-center opacity-20">
              <QrCode size={80} />
              <p className="text-[8px] font-bold mt-2 uppercase">Engine Offline</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

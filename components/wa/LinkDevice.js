import React, { useState } from 'react';
import { Smartphone, QrCode, Loader2, CheckCircle } from 'lucide-react';

export default function LinkDevice({ email }) {
  const [method, setMethod] = useState('qr'); // 'qr' or 'pairing'
  const [pairingCode, setPairingCode] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const startConnection = async () => {
    setLoading(true);
    const res = await fetch('/api/wa/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, method, phone })
    });
    const data = await res.json();
    if (data.pairingCode) setPairingCode(data.pairingCode);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-[#DDD] p-10 shadow-sm max-w-3xl mx-auto">
      <div className="flex gap-8">
        {/* Left: Instructions */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold">Link BaseKey to WhatsApp</h2>
          <ol className="space-y-4 text-sm text-[#606770] list-decimal ml-4">
            <li>Open WhatsApp on your phone</li>
            <li>Tap <b>Menu</b> or <b>Settings</b> and select <b>Linked Devices</b></li>
            <li>Tap on <b>Link a Device</b></li>
            <li>Point your phone to this screen or use pairing code</li>
          </ol>
          
          <div className="flex gap-2 p-1 bg-[#F5F6F7] rounded-xl w-fit">
            <button onClick={() => setMethod('qr')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${method === 'qr' ? 'bg-white shadow-sm text-[#00A884]' : 'text-[#606770]'}`}>QR Code</button>
            <button onClick={() => setMethod('pairing')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${method === 'pairing' ? 'bg-white shadow-sm text-[#00A884]' : 'text-[#606770]'}`}>Phone Number</button>
          </div>
        </div>

        {/* Right: Display QR or Pairing Code */}
        <div className="w-64 h-64 bg-[#F5F6F7] rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-[#DDD] relative overflow-hidden">
          {loading ? (
            <Loader2 className="animate-spin text-[#00A884]" size={40} />
          ) : method === 'qr' ? (
            <div className="text-center p-4">
              <QrCode size={120} className="text-gray-300 mx-auto mb-4" />
              <p className="text-[10px] font-bold uppercase text-gray-400">QR Engine Standby</p>
            </div>
          ) : (
            <div className="p-6 w-full text-center">
              {pairingCode ? (
                <div className="space-y-4">
                  <p className="text-2xl font-black tracking-[0.2em] text-[#00A884]">{pairingCode}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Enter this code on your phone</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <input placeholder="91XXXXXXXXXX" onChange={(e) => setPhone(e.target.value)} className="w-full h-10 rounded-lg border border-[#DDD] text-center text-sm font-mono" />
                  <button onClick={startConnection} className="w-full bg-[#1C1E21] text-white text-[10px] font-bold py-3 rounded-lg uppercase">Get Code</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
                                                                                                                             }
          

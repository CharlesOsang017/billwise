import React, { useState } from 'react';
import { ShieldCheck, Link2, Trash2, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';

const ConnectAccounts = () => {
  const [connecting, setConnecting] = useState({ id: null, status: 'idle' });
  const [connectedAccounts, setConnectedAccounts] = useState([
    { id: 1, name: 'M-Pesa Personal', detail: '0712 *** 890' },
    { id: 2, name: 'KCB Salary Account', detail: '**** 4521' }
  ]);

  const partnerBanks = [
    { id: 'kcb', name: 'KCB Bank', desc: 'Direct feed & Auto-pay', logo: 'KCB', color: 'text-primary' },
    { id: 'eq', name: 'Equity Bank', desc: 'EazzyNet Integration', logo: 'EQ', color: 'text-orange-600' }
  ];

  const handleConnect = (bankId, bankName) => {
    setConnecting({ id: bankId, status: 'connecting' });
    
    // Simulate API connection delay
    setTimeout(() => {
      const newAccount = {
        id: Date.now(),
        name: bankName,
        detail: '**** ' + Math.floor(1000 + Math.random() * 9000)
      };
      setConnectedAccounts([...connectedAccounts, newAccount]);
      setConnecting({ id: bankId, status: 'success' });
      
      // Reset success state after a moment
      setTimeout(() => setConnecting({ id: null, status: 'idle' }), 2000);
    }, 1500);
  };

  const handleRemove = (id) => {
    setConnectedAccounts(connectedAccounts.filter(acc => acc.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect Your Accounts</h1>
        <p className="text-lg text-gray-600 mb-6">
          Securely link your financial accounts to enable automated payments. Experience stress-free bill management with real-time sync and smart reminders.
        </p>
        
        <div className="inline-flex items-center px-4 py-2 rounded-lg bg-green-50 text-green-700 border border-green-200 mb-10">
          <ShieldCheck className="w-5 h-5 mr-2" />
          <span className="font-medium text-sm">Bank-level 256-bit AES Encryption Secure</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {/* M-Pesa Express Card */}
          <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mr-6 border border-green-100">
                <span className="text-green-600 font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">M-Pesa Express</h3>
                <p className="text-gray-500 text-sm mt-1 max-w-sm">Enable automated STK push requests for instant bill settlement.</p>
              </div>
            </div>
            <button 
              onClick={() => handleConnect('mpesa', 'M-Pesa Number')}
              disabled={connecting.id === 'mpesa'}
              className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {connecting.id === 'mpesa' && connecting.status === 'connecting' ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Connecting...</>
              ) : connecting.id === 'mpesa' && connecting.status === 'success' ? (
                <><CheckCircle2 className="w-5 h-5 mr-2" /> Linked!</>
              ) : (
                <><Link2 className="w-5 h-5 mr-2" /> Link Phone Number</>
              )}
            </button>
          </div>

          <div>
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-2xl font-bold text-gray-900">Partner Banks</h2>
               <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Secure API Integration</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partnerBanks.map(bank => (
                  <div key={bank.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-gray-50 rounded border border-gray-100 flex items-center justify-center">
                        <span className={`${bank.color} font-bold`}>{bank.logo}</span>
                      </div>
                      <div className="text-gray-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"/><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5"/><path d="M12 5v14"/><path d="M8 12h8"/></svg>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900">{bank.name}</h4>
                    <p className="text-xs text-gray-500 mb-4">{bank.desc}</p>
                    <button 
                      onClick={() => handleConnect(bank.id, bank.name)}
                      disabled={connecting.id === bank.id}
                      className={`w-full font-medium py-2 rounded transition-colors ${
                        connecting.id === bank.id && connecting.status === 'success' 
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'border border-gray-300 text-primary hover:bg-gray-50'
                      }`}
                    >
                      {connecting.id === bank.id && connecting.status === 'connecting' ? (
                        <span className="flex items-center justify-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Connecting...</span>
                      ) : connecting.id === bank.id && connecting.status === 'success' ? (
                        <span className="flex items-center justify-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Connected</span>
                      ) : (
                        'Connect'
                      )}
                    </button>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-6 flex items-start border border-indigo-100">
            <ShieldCheck className="w-6 h-6 text-indigo-600 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-indigo-900 mb-1">Your Data is Guarded</h4>
              <p className="text-sm text-indigo-800 leading-relaxed">
                We never store your login credentials. Connections are made via encrypted tokens using industry-standard OAuth 2.0 protocols. Your financial security is our top priority.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Connected Accounts</h3>
            <div className="space-y-3 mb-6">
              {connectedAccounts.length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-4">No accounts connected yet.</div>
              ) : (
                connectedAccounts.map((acc) => (
                  <div key={acc.id} className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center animate-fade-in">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{acc.name}</p>
                        <p className="text-xs text-gray-500">{acc.detail}</p>
                      </div>
                    </div>
                    <button onClick={() => handleRemove(acc.id)} className="text-red-500 hover:text-red-700 p-2 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Linked</span>
                <span className="font-bold text-primary">{connectedAccounts.length} Accounts</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">Auto-pay Status</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${connectedAccounts.length > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                  {connectedAccounts.length > 0 ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-xl p-6 text-white overflow-hidden relative shadow-lg">
             <div className="relative z-10">
               <h3 className="text-lg font-bold mb-2">Need help connecting?</h3>
               <p className="text-sm text-blue-100 mb-6">
                 Our support team is available 24/7 to assist with your account setup.
               </p>
               <button className="w-full bg-white text-primary font-bold py-2.5 rounded-lg flex justify-center items-center hover:bg-gray-50 transition-colors shadow-sm">
                 <MessageSquare className="w-4 h-4 mr-2" />
                 Chat with Support
               </button>
             </div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectAccounts;

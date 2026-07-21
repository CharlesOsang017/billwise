import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingDown, RefreshCw, Send, CircleDollarSign, Loader2 } from 'lucide-react';
import { getAIAdvice } from '../api';

const AIAdvice = () => {
  const [adviceData, setAdviceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    try {
      setIsLoading(true);
      const data = await getAIAdvice();
      setAdviceData(data);
    } catch (error) {
      console.error("Failed to fetch AI advice", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">AI is analyzing your financial data...</h2>
        <p className="text-gray-500 mt-2">Running transaction history through our intelligence engine.</p>
      </div>
    );
  }

  if (!adviceData) {
    return <div className="text-center py-20 text-red-500">Failed to load AI Advice. Please try again.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="bg-primary rounded-2xl p-8 md:p-12 text-white mb-8 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center text-blue-200 text-sm font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            AI-Powered Intelligence
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Financial Advice</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Personalized insights to master your money. Our engine analyzes thousands of transactions to find the gaps you might have missed.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at right, rgba(255,255,255,0.8) 0%, transparent 70%)' }}></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <CircleDollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Potential Savings</h3>
            <p className="text-sm text-gray-600 mb-4 h-16">
              {adviceData.savings.message}
            </p>
            <div className="text-success font-semibold text-sm">Save up to ${adviceData.savings.amount}/year</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Subscription Audit</h3>
            <p className="text-sm text-gray-600 mb-4 h-16">
              {adviceData.audit.message}
            </p>
            <div className="text-danger font-semibold text-sm">Action: Review cancellations</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm md:col-span-2 flex flex-col md:flex-row justify-between items-center transition-transform hover:-translate-y-1">
            <div className="mb-4 md:mb-0 md:mr-6">
               <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cash Flow Prediction</h3>
              <p className="text-sm text-gray-600">
                {adviceData.cashFlow.prediction}
              </p>
            </div>
            {/* Mock Chart Area driven by AI Data */}
            <div className="w-full md:w-48 h-32 bg-gray-50 border border-gray-100 rounded flex items-end justify-between p-2 space-x-1">
              {adviceData.cashFlow.dataPoints.map((h, i) => (
                <div key={i} className={`w-full ${i===4 ? 'bg-danger' : 'bg-primary'} rounded-t opacity-80`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
           <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Health Score</h3>
           <div className="relative w-48 h-48 mb-6">
             <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary" strokeDasharray={`${adviceData.healthScore.score}, 100`} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-5xl font-extrabold text-gray-900 tracking-tighter">{adviceData.healthScore.score}</span>
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{adviceData.healthScore.status}</span>
             </div>
           </div>
           
           <div className="w-full space-y-4">
             <div>
               <div className="flex justify-between text-xs font-semibold mb-1">
                 <span className="text-gray-600">Debt-to-Income</span>
                 <span className="text-gray-900">{adviceData.healthScore.debtToIncome}</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-success h-1.5 rounded-full" style={{width: adviceData.healthScore.debtToIncome}}></div></div>
             </div>
             <div>
               <div className="flex justify-between text-xs font-semibold mb-1">
                 <span className="text-gray-600">Payment Reliability</span>
                 <span className="text-gray-900">{adviceData.healthScore.paymentReliability}</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-success h-1.5 rounded-full" style={{width: adviceData.healthScore.paymentReliability}}></div></div>
             </div>
           </div>
           
           <button className="mt-8 text-primary font-semibold text-sm hover:text-primary-dark">
             View Full Audit Report →
           </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Smart Recommendations</h2>
      <div className="space-y-4 mb-10">
        {adviceData.recommendations.map((rec, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4 sm:mb-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${index === 0 ? 'bg-green-100 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                {index === 0 ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                )}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{rec.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
              </div>
            </div>
            <button className={`w-full sm:w-auto px-5 py-2 rounded-lg font-medium transition-colors ${index === 0 ? 'bg-primary text-white hover:bg-primary-dark' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              {rec.action}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl overflow-hidden shadow-inner">
        <div className="bg-indigo-100/50 px-4 py-3 border-b border-indigo-100 flex items-center">
          <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
          <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wide">Financial Advisor AI is online</span>
        </div>
        <div className="p-6">
          <div className="bg-white rounded-lg p-4 inline-block shadow-sm mb-6 max-w-2xl border border-indigo-50">
            <p className="text-gray-800 text-sm">
              Hi! I'm your financial assistant. You can ask me things like "How much did I spend on food last month?" or "Can I afford a $200 purchase today?"
            </p>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask your AI advisor a question..." 
              className="w-full border border-gray-300 rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-primary text-white rounded-lg px-4 hover:bg-primary-dark transition-colors flex items-center justify-center">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvice;

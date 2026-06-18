import React, { useState, useEffect } from 'react';
import Portfolio from './components/Portfolio';
import Market from './components/Market';
import Chat from "./components/Chat";
import {LineChart, Line, ResponsiveContainer} from "recharts";

function App() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [ihsg, setIHSG] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  // useEffect(() => {fetch("http://localhost:8000/api/ihsg")
  //     .then(res => res.json())
  //     .then(data => setIHSG(data))
  //     .catch(console.error);
  // }, []);
  useEffect(() => {
    // Ubah URL di dalam fetch menggunakan backtick (`) dan variabel API_URL
    fetch(`${API_URL}/api/ihsg`)
      .then(res => res.json())
      .then(data => setIHSG(data))
      .catch(console.error);
  }, []);

  const chartData = ihsg?.chart?.map((value, index) => ({
    day: index,
    value: value
  })) || [];

  return (
    <div className="min-h-screen bg-[#0b1121] text-white font-sans selection:bg-emerald-500 selection:text-white">

     <header className="border-b border-slate-800 bg-[#0b1121] sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-2 md:px-4 flex justify-between items-center h-auto md:h-16 flex-wrap">

    {/* Logo */}
    <div className="flex items-center gap-2 py-3 px-2">
      <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-white">S</div>
      <h1 className="text-lg md:text-xl font-bold tracking-wide text-emerald-400">
        StockInvest <span className="text-white">AI</span>
      </h1>
    </div>

    {/* Navigasi: flex-wrap agar pindah baris di HP */}
    <nav className="flex flex-wrap justify-center space-x-1 md:space-x-4 border-t md:border-t-0 border-slate-800 w-full md:w-auto">
      {['portfolio', 'market', 'chat'].map((tab) => (
        <button
          key={tab}
          className={`px-3 md:px-5 py-3 md:py-5 text-xs md:text-sm font-semibold transition-all border-b-2 ${
            activeTab === tab
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab === 'portfolio' ? 'Dashboard' : tab === 'market' ? 'Market Movers' : 'AI Chatbot'}
        </button>
      ))}
    </nav>

    {/* IHSG Section: Hidden di HP, muncul di Desktop */}
    <div className="hidden md:flex items-center gap-3 mr-2">
      <div className="text-right">
        <div className="text-[10px] text-slate-400">IHSG</div>
        <div className={`text-xs font-bold ${ihsg?.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          {ihsg?.index?.toLocaleString("id-ID")}
        </div>
      </div>
      <div style={{ width: 80, height: 30 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="value" dot={false} strokeWidth={2} stroke={ihsg?.change >= 0 ? "#22c55e" : "#ef4444"} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
</header>

      <main className="max-w-7xl mx-auto p-4 py-8">
        {activeTab === 'portfolio' && <Portfolio />}
        {activeTab === 'market' && <Market />}
        {activeTab === 'chat' && <Chat />}
      </main>

    </div>
  );
}

export default App;
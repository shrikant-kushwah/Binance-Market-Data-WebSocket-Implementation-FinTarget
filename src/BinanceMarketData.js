import React, { useEffect, useState, useRef } from 'react';
import ChartComponent from './components/ChartComponent';
import CoinSelector from './components/CoinSelector';
import { connectWebSocket } from './services/WebSocketService';

const initialCoins = [
  { label: 'ETH/USDT', value: 'ethusdt' },
  { label: 'BNB/USDT', value: 'bnbusdt' },
  { label: 'DOT/USDT', value: 'dotusdt' }
];

const MAX_CANDLES = 40; 

const BinanceMarketData = () => {
  const [coins, setCoins] = useState(initialCoins); 
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [selectedInterval, setSelectedInterval] = useState('1m');
  const [chartData, setChartData] = useState({});
  const ws = useRef(null);

  const loadSavedData = (coin, interval) => {
    const savedData = localStorage.getItem(`${coin}_${interval}`);
    if (savedData) {
      setChartData(JSON.parse(savedData));
    } else {
      setChartData([]);
    }
  };

  useEffect(() => {
    loadSavedData(selectedCoin, selectedInterval);
    
    ws.current = connectWebSocket(selectedCoin, selectedInterval, (newCandle) => {
      setChartData((prevData) => {
        const updatedData = [...(prevData[selectedCoin] || []), newCandle].slice(-MAX_CANDLES);
        localStorage.setItem(`${selectedCoin}_${selectedInterval}`, JSON.stringify(updatedData));
        return { ...prevData, [selectedCoin]: updatedData };
      });
    });

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [selectedCoin, selectedInterval]);

  return (
    <div className="container mx-auto bg-[#f0f0f0] min-h-screen">
      {/* navbar */}
      <nav className="flex items-center justify-between bg-gray-800 p-4 px-8 shadow-md">
        <div className="text-yellow-400 font-bold text-2xl cursor-pointer">Binance</div>
        <ul className="flex space-x-4 text-md text-gray-300">
          <li className="hover:text-yellow-400 cursor-pointer">Home</li>
          <li className="hover:text-yellow-400 cursor-pointer">Markets</li>
          <li className="hover:text-yellow-400 cursor-pointer">Portfolio</li>
        </ul>
      </nav>

      {/* title */}
      <h2 className="text-5xl font-extrabold mt-6 mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        Binance Market Data
      </h2>

      {/* coin Selector */}
      <CoinSelector
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        coins={coins}
        setCoins={setCoins} 
      />

      {/* chart container */}
      <div className="bg-gray-800 min-h-screen shadow-lg rounded-lg p-6 mt-6">
      <div className="flex justify-center items-center text-gray-300 mb-2">
  <h3 className="text-2xl font-bold text-center">{selectedCoin.toUpperCase()} / USDT</h3>
</div>

        <div className="h-96">
          <ChartComponent data={chartData[selectedCoin] || []} />
        </div>
      </div>

      {/* footer */}
      <footer className="mt-8 p-3 text-center text-gray-700">
        <p>&copy; 2024 Binance Market Data. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BinanceMarketData;

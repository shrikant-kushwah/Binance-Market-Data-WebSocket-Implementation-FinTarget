import React, { useState } from 'react';
import Dropdown from './Dropdown';

const CoinSelector = ({ selectedCoin, setSelectedCoin, selectedInterval, setSelectedInterval, coins, setCoins }) => {
  const [newCoinSymbol, setNewCoinSymbol] = useState('');

  const handleAddCoin = () => {
    if (newCoinSymbol && !coins.some(coin => coin.value === newCoinSymbol.toLowerCase())) {
      const newCoin = { label: `${newCoinSymbol.toUpperCase()}/USDT`, value: newCoinSymbol.toLowerCase() };
      setCoins(prevCoins => [...prevCoins, newCoin]);
      setNewCoinSymbol(''); 
    }
  };

  return (
    <div className="mb-6 py-4 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6 text-center p-6 rounded-lg shadow-lg">
      {/* Coin Dropdown */}
      <Dropdown
        label="Select Cryptocurrency"
        options={coins}
        selected={selectedCoin}
        onChange={setSelectedCoin}
        className="w-full lg:w-1/3"
      />

      {/* Add New Coin Input */}
      <div className="flex justify-center items-center w-full lg:w-1/3">
        <input
          type="text"
          className="border border-gray-300 text-gray-900 placeholder-gray-500 p-3 rounded-l-lg focus:ring-2 focus:ring-blue-500 outline-none w-full max-w-xs bg-white"
          placeholder="Add new coin symbol (e.g., DOT)"
          value={newCoinSymbol}
          onChange={(e) => setNewCoinSymbol(e.target.value)}
        />
        <button
          onClick={handleAddCoin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg flex items-center justify-center"
        >
          Add Coin
        </button>
      </div>

      {/* intervaldropdown */}
      <Dropdown
        label="Select Time Interval"
        options={[
          { label: '1 Minute', value: '1m' },
          { label: '3 Minutes', value: '3m' },
          { label: '5 Minutes', value: '5m' }
        ]}
        selected={selectedInterval}
        onChange={setSelectedInterval}
        className="w-full lg:w-1/3"
      />
    </div>
  );
};

export default CoinSelector;

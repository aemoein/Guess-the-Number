import React from 'react';

const TopBar = ({ username, score }) => (
  <div className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow-md rounded-b-2xl">
    <div className="text-lg font-bold">🎮 Guess the Number</div>
    <div className="flex items-center gap-4">
      <span className="text-sm">👤 {username}</span>
      <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-semibold">⭐ {score}</span>
    </div>
  </div>
);

export default TopBar;
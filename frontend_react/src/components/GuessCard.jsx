import React from 'react';

const GuessCard = ({ title, children }) => {
  return (
    <div className="w-full max-w-sm p-5 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
};

export default GuessCard;
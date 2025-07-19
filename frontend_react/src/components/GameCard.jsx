import React from 'react';

const GameCard = ({ title, description, icon, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition w-full sm:w-64"
  >
    {icon && <div className="text-3xl mb-2">{icon}</div>}
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-sm mt-1">{description}</p>
  </div>
);

export default GameCard;
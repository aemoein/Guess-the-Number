import React from 'react';

const PrimaryButton = ({ children, onClick, type = "button", disabled }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-purple-700 disabled:opacity-50"
  >
    {children}
  </button>
);

export default PrimaryButton;
import React from 'react';

const PrimaryButton = ({ children, onClick, type = "button", disabled }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className="px-6 py-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition disabled:opacity-50"
  >
    {children}
  </button>
);

export default PrimaryButton;
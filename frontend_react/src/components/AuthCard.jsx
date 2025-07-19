import React from 'react';

const AuthCard = ({ title, children }) => (
  <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-[#111827] to-[#1f2937] text-white shadow-2xl">
    <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
    {children}
  </div>
);

export default AuthCard;
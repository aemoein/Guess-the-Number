import React from 'react';

const AuthCard = ({ title, subtitle, children }) => (
  <div className="relative w-full max-w-md bg-[#1e1e30] border border-purple-700 rounded-3xl p-8 shadow-[0_0_60px_rgba(139,92,246,0.3)] backdrop-blur-md">
    {/* Glowing Floating Ring */}
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-28 h-2 bg-purple-500 rounded-full blur-lg opacity-70 animate-pulse" />

    {/* Card Content */}
    <div className="relative z-10">
      <h1 className="text-4xl font-extrabold text-center text-purple-400 mb-2 tracking-widest drop-shadow-[0_0_6px_rgba(139,92,246,0.7)]">
        {title}
      </h1>

      <p className="text-base text-center text-gray-300 mb-6 font-light tracking-wide">
        {subtitle}
      </p>

      <div className="space-y-5">
        {children}
      </div>
    </div>
  </div>
);

export default AuthCard;

import React from 'react';

const InputField = ({ label, type = "text", name, value, onChange, error }) => (
  <div className="flex flex-col mb-4 w-full max-w-md">
    <label className="text-sm text-white font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="px-4 py-2 rounded-2xl bg-[#1f2937] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export default InputField;
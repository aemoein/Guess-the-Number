import React from 'react';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  disabled,
  error,
}) => (
  <div className="flex flex-col mb-4 w-full">
    {label && (
      <label className="text-sm text-purple-300 font-semibold mb-1">{label}</label>
    )}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`px-4 py-2 rounded-2xl bg-[#2a2a40] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder-gray-400 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export default InputField;
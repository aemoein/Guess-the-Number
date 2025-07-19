import React from 'react';

const Toast = ({ message, type = 'success' }) => {
  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  return (
    <div className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white ${bgColor} shadow-xl`}>
      {message}
    </div>
  );
};

export default Toast;
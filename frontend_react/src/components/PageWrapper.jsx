import React from 'react';

const PageWrapper = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
    {children}
  </div>
);

export default PageWrapper;
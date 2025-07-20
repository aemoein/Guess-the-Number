import React from 'react';

const PageWrapper = ({ children }) => (
  <div className="min-h-screen w-full flex items-center justify-center bg-galaxy p-4 sm:p-8 relative overflow-hidden">
    {/* Cosmic background layer */}
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-grid-pattern"></div>
      </div>

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 opacity-30 blur-[1px] animate-float"
          style={{
            width: `${Math.random() * 12 + 4}px`,
            height: `${Math.random() * 12 + 4}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {/* Glow accents */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
    </div>

    {/* Actual content */}
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default PageWrapper;

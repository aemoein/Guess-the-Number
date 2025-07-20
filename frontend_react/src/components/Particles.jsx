// components/CosmicParticles.jsx
const CosmicParticles = ({ count = 30 }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-purple-500 to-pink-400 opacity-30 blur-[1px] animate-float"
          style={{
            width: `${Math.random() * 12 + 4}px`,
            height: `${Math.random() * 12 + 4}px`,
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

export default CosmicParticles;
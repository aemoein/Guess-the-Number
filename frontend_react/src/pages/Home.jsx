import React from 'react';
import { PageWrapper, TopBar, GameCard } from '../components';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-3xl">
        <TopBar username="Player1" score={0} />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <GameCard title="🕹️ Start New Game">
            <p className="text-sm mb-4">Try to guess the number in as few attempts as possible.</p>
            <button
              onClick={() => handleNavigate('/game')}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 mt-2 rounded-xl text-white font-semibold w-full"
            >
              Start Playing
            </button>
          </GameCard>

          <GameCard title="📈 View Stats">
            <p className="text-sm mb-4">Check your past games, success rate, and more insights.</p>
            <button
              onClick={() => handleNavigate('/stats')}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 mt-2 rounded-xl text-white font-semibold w-full"
            >
              View Statistics
            </button>
          </GameCard>

          <GameCard title="⚙️ Settings">
            <p className="text-sm mb-4">Customize your experience or log out.</p>
            <button
              onClick={() => handleNavigate('/settings')}
              className="bg-purple-500 hover:bg-purple-600 px-4 py-2 mt-2 rounded-xl text-white font-semibold w-full"
            >
              Go to Settings
            </button>
          </GameCard>

          <GameCard title="❓ How to Play">
            <p className="text-sm mb-4">Learn the rules and improve your guessing strategy.</p>
            <button
              onClick={() => handleNavigate('/how-to-play')}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 mt-2 rounded-xl text-white font-semibold w-full"
            >
              Learn More
            </button>
          </GameCard>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;

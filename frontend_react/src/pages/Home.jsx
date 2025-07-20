import React from 'react';
import { PageWrapper, TopBar, GameCard } from '../components';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-3xl">
        <TopBar username="Player1" score={0} />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <GameCard
            title="🕹️ Start New Game"
            description="Try to guess the number in as few attempts as possible."
            onClick={() => handleNavigate('/game')}
          />

          <GameCard
            title="📈 View Stats"
            description="Check your past games, success rate, and more insights."
            onClick={() => handleNavigate('/stats')}
          />

          <GameCard
            title="⚙️ Settings"
            description="Customize your experience or log out."
            onClick={() => handleNavigate('/settings')}
          />

          <GameCard
            title="❓ How to Play"
            description="Learn the rules and improve your guessing strategy."
            onClick={() => handleNavigate('/how-to-play')}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
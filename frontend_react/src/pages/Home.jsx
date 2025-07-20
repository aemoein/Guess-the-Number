import React from 'react';
import { PageWrapper, TopBar, GameCard } from '../components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleNavigate = (path) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-3xl">
        <TopBar username={user?.username || 'Player'} score={0} />

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
            title="🚪 Logout"
            description="Sign out of your account safely."
            onClick={handleLogout}
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
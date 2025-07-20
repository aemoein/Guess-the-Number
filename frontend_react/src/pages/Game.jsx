import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import { useNavigate } from 'react-router-dom';
import {
  PageWrapper,
  TopBar,
  Loader,
  GameCard,
  Toast,
  GuessCard,
} from '../components';
import { useAuth } from '../contexts/AuthContext';

const Game = () => {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('success');
  const [history, setHistory] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [bestScore, setBestScore] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();
  const [width, height] = useWindowSize();
  const { user, apiCall } = useAuth();

  useEffect(() => {
    const initializeGame = async () => {
      if (user) {
        setUsername(user.username);
        
        try {
          // Get user info and best score
          const res = await apiCall('/me');
          if (res.ok) {
            const data = await res.json();
            if (data.bestScore) setBestScore(data.bestScore);
          }
          
          // Start a new game
          await startNewGame();
        } catch (err) {
          console.error('Error initializing game:', err);
        }
      }
    };

    initializeGame();
  }, [user]);

  const startNewGame = async () => {
    try {
      const res = await apiCall('/start', { method: 'POST' });
      const data = await res.json();
      
      setGameState(data);
      setHistory([]);
      setGuess('');
      setScore(0);
      setLastResult(null);
      setShowConfetti(false);
    } catch (error) {
      console.error('Error starting new game:', error);
      showToast('Failed to start new game.', 'error');
    }
  };

  const submitGuess = async () => {
    const numericGuess = parseInt(guess);
    if (!numericGuess || numericGuess < 1 || numericGuess > 43) {
      showToast('Enter a number between 1 and 43.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await apiCall(`/guess/${numericGuess}`, { method: 'POST' });
      const data = await res.json();
      
      console.log(`Guess: ${numericGuess} → Result:`, data);

      setHistory(prev => [
        ...prev,
        { guess: numericGuess, result: data.result },
      ]);
      setScore(data.attempts);
      setGuess('');
      setLastResult(data.result);

      if (data.result === 'correct') {
        showToast('🎉 Correct! You won!', 'success');
        if (data.newBestScore != null) {
          setBestScore(data.newBestScore);
        }
        setShowConfetti(true);
      } else {
        showToast(data.message, 'info');
      }
    } catch (error) {
      console.error('Error submitting guess:', error);
      showToast('Something went wrong while submitting your guess.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type) => {
    setMessage(msg);
    setType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <>
    {showConfetti && <Confetti width={width} height={height} />}
    <PageWrapper>
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <TopBar username={username} score={bestScore} />

        {bestScore !== null && (
          <div className="text-center text-green-500 font-semibold">
            🏆 Your Best Score: {bestScore} guesses
          </div>
        )}

        <div className="flex flex-col gap-6 items-center justify-center">
          <GuessCard title="Enter Your Guess">
            <input
                type="number"
                value={guess}
                onChange={e => setGuess(e.target.value)}
                className="w-full mt-2 p-2 text-white font-bold text-center bg-gray-800 rounded-lg placeholder-gray-400"
                placeholder="1 - 43"
                min="1"
                max="43"
            />
            <button
              onClick={submitGuess}
              className="mt-3 w-full bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg font-semibold"
            >
              Submit Guess
            </button>
          </GuessCard>

          {lastResult && lastResult !== 'correct' && (
            <GuessCard title="Hint">
              <p className="text-lg">
                🔍 Try a{' '}
                <span className="font-semibold text-yellow-300">
                  {lastResult === 'higher' ? 'higher' : 'lower'}
                </span>{' '}
                number!
              </p>
            </GuessCard>
          )}

          {lastResult === 'correct' && (
            <GuessCard title="🎉 Congratulations!">
              <p className="text-lg font-medium mb-2">
                You guessed the number in {score} tries!
              </p>
              <div className="flex gap-4">
                <button
                  onClick={startNewGame}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                >
                  🔄 New Game
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  🏠 Go Home
                </button>
              </div>
            </GuessCard>
          )}

          <GuessCard title="Previous Guesses">
            <div className="space-y-1 text-sm">
              {history.length > 0 ? (
                history.map((h, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>🎯 {h.guess}</span>
                    <span> {' - '} </span>
                    <span
                      className={
                        h.result === 'correct'
                          ? 'text-green-400'
                          : h.result === 'higher'
                          ? 'text-blue-400'
                          : 'text-red-400'
                      }
                    >
                      {h.result}
                    </span>
                  </div>
                ))
              ) : (
                <p>No guesses yet.</p>
              )}
            </div>
          </GuessCard>
        </div>

        {loading && <Loader />}
        {message && <Toast message={message} type={type} />}
      </div>
    </PageWrapper>
    </>
  );
};

export default Game;
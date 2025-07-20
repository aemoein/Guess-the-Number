import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PageWrapper,
  TopBar,
  Loader,
  GameCard,
  Toast,
} from '../components';
import { apiUrl } from '../config';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(`${apiUrl}/me`);
        if (res.data?.username) {
          setUsername(res.data.username);
          if (res.data.bestScore) setBestScore(res.data.bestScore);
          startNewGame();
        } else {
          navigate('/login');
        }
      } catch (err) {
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  const startNewGame = async () => {
    try {
      const res = await axios.post(`${apiUrl}/start`);
      setGameState(res.data);
      setHistory([]);
      setGuess('');
      setScore(0);
    } catch (err) {
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
      const res = await axios.post(`${apiUrl}/guess`, { guess: numericGuess });

      setHistory(prev => [...prev, { guess: numericGuess, result: res.data.result }]);
      setScore(res.data.score);
      setGuess('');

      if (res.data.result === 'correct' && res.data.newBestScore != null) {
        setBestScore(res.data.newBestScore);
      }

      showToast(res.data.message, res.data.result === 'correct' ? 'success' : 'info');
    } catch (err) {
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
    <PageWrapper>
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <TopBar username={username} score={score} />

        {bestScore !== null && (
          <div className="text-center text-green-500 font-semibold">
            🏆 Your Best Score: {bestScore} guesses
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <GameCard title="Enter Your Guess">
            <input
              type="number"
              value={guess}
              onChange={e => setGuess(e.target.value)}
              className="w-full mt-2 p-2 text-black rounded-lg"
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
          </GameCard>

          <GameCard title="Previous Guesses">
            <div className="space-y-1 text-sm">
              {history.map((h, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>🎯 {h.guess}</span>
                  <span className={
                    h.result === 'correct' ? 'text-green-400' :
                    h.result === 'higher' ? 'text-blue-400' : 'text-red-400'
                  }>
                    {h.result}
                  </span>
                </div>
              ))}
              {!history.length && <p>No guesses yet.</p>}
            </div>
          </GameCard>
        </div>

        <div className="text-center">
          <button
            onClick={startNewGame}
            className="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-6 rounded-xl font-bold"
          >
            🔄 New Game
          </button>
        </div>

        {loading && <Loader />}
        {message && <Toast message={message} type={type} />}
      </div>
    </PageWrapper>
  );
};

export default Game;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PageWrapper,
  GameCard,
  Loader,
  Toast,
} from '../components';
import { apiUrl } from '../config';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const Stats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${apiUrl}/Game/Stats`);
      setStats(res.data);
    } catch (err) {
      setError('Failed to load stats.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        <h2 className="text-3xl font-bold text-center text-white">📊 Game Statistics</h2>

        {loading && <Loader />}
        {error && <Toast message={error} type="error" />}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-3 gap-4"
          >
            <GameCard title="Games Played">
              <p className="text-2xl font-bold text-center">{stats.totalGames}</p>
            </GameCard>

            <GameCard title="Average Score">
              <p className="text-2xl font-bold text-center">{stats.averageScore?.toFixed(2)}</p>
            </GameCard>

            <GameCard title="Best Score">
              <p className="text-2xl font-bold text-center text-green-400">
                {stats.bestScore}
              </p>
            </GameCard>
          </motion.div>
        )}

        {stats?.scoreHistory?.length > 0 && (
          <div className="bg-white/10 p-4 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">🧠 Score History</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gameNumber" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {!loading && stats?.scoreHistory?.length === 0 && (
          <p className="text-center text-gray-300">No games played yet to display stats.</p>
        )}
      </div>
    </PageWrapper>
  );
};

export default Stats;
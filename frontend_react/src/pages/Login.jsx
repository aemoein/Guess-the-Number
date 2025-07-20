import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageWrapper,
  AuthCard,
  InputField,
  PrimaryButton,
  ErrorMessage,
} from '../components';
import { apiUrl } from '../config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 👈 Required for session cookies
        body: JSON.stringify({ username, password }),
      });

      const message = await response.text();

      if (response.ok) {
        // Optional: store logged-in flag in localStorage (if needed)
        // localStorage.setItem('isLoggedIn', 'true');
        navigate('/'); // 👈 use navigate instead of full reload
      } else {
        setError(message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <AuthCard
        title="🎮 Guess The Number"
        subtitle="Log in to start your game!"
      >
        <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
          {error && <ErrorMessage message={error} />}

          <InputField
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Enter the Arena'}
          </PrimaryButton>
        </form>

        <p className="text-white text-sm text-center mt-6">
          Don’t have an account?{' '}
          <span
            className="underline cursor-pointer hover:text-indigo-300"
            onClick={() => navigate('/register')}
          >
            Sign up
          </span>
        </p>
      </AuthCard>
    </PageWrapper>
  );
};

export default Login;
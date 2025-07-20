import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageWrapper,
  AuthCard,
  InputField,
  PrimaryButton,
  ErrorMessage,
} from '../components';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Login failed. Please try again.');
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageWrapper,
  AuthCard,
  InputField,
  PrimaryButton,
  ErrorMessage,
} from '../components';
import { apiUrl } from '../config';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Safe to keep; backend just won’t set session
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const message = await response.text();

      if (response.ok) {
        // ✅ Force login after register — redirect user to login page
        alert('✅ Registration successful! Please log in.');
        navigate('/login');
      } else {
        setError(message || 'Registration failed. Try a different username.');
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
        title="🎯 Create Your Account"
        subtitle="Join the game and climb the leaderboard!"
      >
        <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
          {error && <ErrorMessage message={error} />}

          <InputField
            label="Username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register & Play!'}
          </PrimaryButton>
        </form>

        <p className="text-white text-sm text-center mt-6">
          Already have an account?{' '}
          <span
            className="underline cursor-pointer hover:text-yellow-200"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </AuthCard>
    </PageWrapper>
  );
};

export default Register;
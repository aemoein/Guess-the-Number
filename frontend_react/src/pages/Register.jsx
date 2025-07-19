import React, { useState } from 'react';
import {
  PageWrapper,
  AuthCard,
  InputField,
  PrimaryButton,
  ErrorMessage,
} from '../components';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required.');
    } else {
      setError('');
      // API call or form logic here
    }
  };

  return (
    <PageWrapper>
      <AuthCard title="🎯 Create Your Account" subtitle="Join the game and climb the leaderboard!">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <ErrorMessage message={error} />}

          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PrimaryButton text="Register & Play!" />
        </form>

        <p className="text-white text-sm text-center mt-6">
          Already have an account?{' '}
          <a href="/login" className="underline hover:text-yellow-200">Login</a>
        </p>
      </AuthCard>
    </PageWrapper>
  );
};

export default Register;
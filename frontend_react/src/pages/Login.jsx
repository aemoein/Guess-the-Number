import { useState } from 'react';
import {
  PageWrapper,
  AuthCard,
  InputField,
  PrimaryButton,
  ErrorMessage,
} from '../components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder login logic
    if (!email || !password) {
      setError('Please enter both email and password.');
    } else {
      setError('');
      // Handle actual login logic here
    }
  };

  return (
    <PageWrapper>
      <AuthCard title="🎮 Guess The Number" subtitle="Log in to start your game!">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <ErrorMessage message={error} />}
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton text="Enter the Arena" />
        </form>
        <p className="text-white text-sm text-center mt-6">
          Don’t have an account?{' '}
          <span className="underline cursor-pointer hover:text-indigo-300">Sign up</span>
        </p>
      </AuthCard>
    </PageWrapper>
  );
};

export default Login;
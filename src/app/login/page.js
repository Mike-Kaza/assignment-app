'use client'; // For client-side functionality in Next.js with React hooks

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For page redirection after login
import axios from 'axios'; // For making HTTP requests to your backend API

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      // Sending login data to the backend API
      const response = await axios.post('/api/login', { email, password });

      if (response.status === 200) {
        // Redirect to the dashboard or main page after successful login
        router.push('/dashboard');  // Replace '/dashboard' with the actual page
      }
    } catch (err) {
      setError('Error logging in');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

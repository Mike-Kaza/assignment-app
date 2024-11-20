'use client'; // For Next.js app directory to use React hooks

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For page redirection after registration
import axios from 'axios'; // For making HTTP requests to your backend API

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role is 'customer'
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      // Sending registration data to the backend
      const response = await axios.post('/api/register', { name, email, password, role });

      if (response.status === 201) {
        // Redirect to login page after successful registration
        router.push('/login');
      }
    } catch (err) {
      // Handle errors from the backend (e.g., email already taken)
      setError('Error registering user');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="customer">Customer</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

'use client'; // For client-side functionality in Next.js with React hooks

import { useRouter } from 'next/navigation'; // For page redirection

export default function HomePage() {
  const router = useRouter(); // Initialize the Next.js router

  // Handle redirection for the Register button
  const handleRegister = () => {
    router.push('/register');  // Navigate to the registration page
  };

  // Handle redirection for the Login button
  const handleLogin = () => {
    router.push('/login');  // Navigate to the login page
  };

  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>Please choose an option:</p>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}


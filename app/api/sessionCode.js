import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';  //cookies handling

const SESSION_SECRET = 'f3d9d0b9a6e7a8d4c8f3a7e9c1a2b3d4';

export async function getCustomSession() {
  // Await cookies() for asynchronous handling in Next.js
  const cookieStore = await cookies();

  const session = await getIronSession(cookieStore, {
    password: SESSION_SECRET,  // Using the long session secret
    cookieName: 'app',         // Name of the cookie storing session data
    ttl: 60 * 60 * 24 * 7,     // Session TTL (7 days)
    secure: process.env.NODE_ENV === 'production',
  });

  return session;
}



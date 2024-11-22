// /app/api/sessionCode.js
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

// This function will get the session using the cookie and password for encryption
export async function getCustomSession() {
  console.log("loading session stuff");
  
  // This is the password used to encrypt the session, ensure it's secret and safe
  const pw = "VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf"; 

  // Get the session from the cookies
  const session = await getIronSession(cookies(), { password: pw, cookieName: "app" });

  return session;
}

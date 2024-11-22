import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function getCustomSession() {
  const pw = "VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf"; // Session password (change if necessary)
  const session = await getIronSession(cookies(), { password: pw, cookieName: "app" });
  return session;
}

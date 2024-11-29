import { getCustomSession } from "../sessionCode.js";

export async function GET(req) {
  try {
    const session = await getCustomSession(req);  // Get the session data

    if (session?.role) {
      return new Response(JSON.stringify({ role: session.role }), { status: 200 });  // Return the role if session exists
    } else {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });  // If no session, return Unauthorized
    }
  } catch (error) {
    console.error('Error checking session:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

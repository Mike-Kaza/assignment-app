import { getCustomSession } from "../sessionCode.js";

export async function GET(req) {
  try {
    const session = await getCustomSession(req); //retrieve the session data based on the request

    if (session?.role) {
      //check if the session exists and contains a role
      return new Response(
        JSON.stringify({ role: session.role }), //return the user's role as JSON
        { status: 200 } // HTTP status 200 for success
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), //error message for missing session or role
        { status: 401 } //HTTP status 401 for unauthorized access
      );
    }
  } catch (error) {
    console.error('Error checking session:', error); //log any errors that occur
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), //error message for server issues
      { status: 500 } //HTTP status 500 for internal server error
    );
  }
}

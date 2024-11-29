import { MongoClient } from 'mongodb';
import { getCustomSession } from '../sessionCode.js';  // Import the session management function

export async function POST(req) {
  const { email, password } = await req.json();  // Get data from the request body

  const url = process.env.MONGO_URI;  // MongoDB URI from .env
  const client = new MongoClient(url);
  const dbName = 'app';  // Database name

  try {
    await client.connect();  // Connect to MongoDB
    const db = client.db(dbName);
    const collection = db.collection('login');  // User collection

    const user = await collection.findOne({ email });  // Find user by email

    if (user && user.pass === password) {  // Validate user credentials

      // Create session using Iron Session
      const session = await getCustomSession(req);  // Get session

      session.email = user.email;  // Store the email in the session
      session.role = user.acc_type;  // Store the role (manager or customer) in the session

      await session.save();  // Save the session

      // Return a successful response (200)
      return new Response(
        JSON.stringify({ message: 'Login successful', role: user.acc_type }),
        { status: 200 }
      );
    } else {
      // Return a 401 Unauthorized response for invalid credentials
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    // Return a 500 Internal Server Error response
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  } finally {
    await client.close();  // Close MongoDB connection
  }
}


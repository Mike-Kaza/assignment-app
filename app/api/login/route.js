// /app/api/login/route.js
import { MongoClient } from 'mongodb';
import { getCustomSession } from '../sessionCode.js';

export async function POST(req) {
  const { email, password } = await req.json();  // Get data from the request body

  const url = 'mongodb+srv://mikekazakovas123:Mariusma5*@cluster0.douvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(url);
  const dbName = 'app';  // Database name

  try {
    await client.connect();  // Connect to MongoDB
    const db = client.db(dbName);
    const collection = db.collection('login');  // The collection where users are stored

    // Check if the email and password match
    const user = await collection.findOne({ email, pass: password });

    if (user) {
      let session = await getCustomSession();
      session.email = email;
      session.role = user.acc_type;
      await session.save();  // Save the session data

      return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  } finally {
    await client.close();  // Close the MongoDB connection
  }
}

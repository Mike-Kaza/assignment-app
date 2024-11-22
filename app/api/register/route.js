// /app/api/register/route.js
import { MongoClient } from 'mongodb';

export async function POST(req) {
  const { email, password, acc_type } = await req.json();  // Get data from the request body

  const url = 'mongodb+srv://mikekazakovas123:Mariusma5*@cluster0.douvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(url);
  const dbName = 'app';  // Replace with your actual database name

  try {
    await client.connect();  // Connect to MongoDB
    const db = client.db(dbName);
    const collection = db.collection('login');  // The collection where users are stored

    // Check if the email already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
    }

    // Insert the new user into the collection
    const newUser = {
      email,
      pass: password,
      acc_type: acc_type || 'customer',  // Default to 'customer' if no account type is provided
    };

    await collection.insertOne(newUser);  // Insert new user into MongoDB

    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  } finally {
    await client.close();  // Close the MongoDB connection
  }
}

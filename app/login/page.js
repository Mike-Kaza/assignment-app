import { MongoClient } from 'mongodb';
import { getCustomSession } from '../sessionCode.js'; // Import session management function

export async function POST(req) {
  const { email, password } = await req.json(); // Get the email and password from the request body

  
  const url = 'mongodb+srv://mikekazakovas123:Mariusma5*@cluster0.douvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  const client = new MongoClient(url);
  const dbName = 'app'; // Replace with your actual database name

  try {
    // Connect to MongoDB and access the user collection
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('login');

    // Find the user by email
    const user = await collection.findOne({ email });

    if (user && user.pass === password) { // Validate the password
      // Create a session if credentials are valid
      const session = await getCustomSession(req);
      session.email = user.email; // Store the email in the session
      session.role = user.acc_type; // Store the role in the session
      await session.save(); // Save the session

      // Respond with a success message and user role
      return new Response(JSON.stringify({ message: 'Login successful', role: user.acc_type }), {
        status: 200,
      });
    }

    // Return error if credentials are invalid
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  } catch (error) {
    // Log the error and return a generic error message
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}




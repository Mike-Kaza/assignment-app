import { MongoClient } from 'mongodb';
import { getCustomSession } from '../sessionCode.js'; // Session management

export async function GET(req) {
  try {
    const session = await getCustomSession(req); // Fetch the session
    if (!session?.email) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const email = session.email; // Use the logged-in user's email

    // MongoDB Atlas connection
    const url = 'mongodb+srv://mikekazakovas123:Mariusma5*@cluster0.douvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const client = new MongoClient(url);
    const dbName = 'test'; //
    const collectionName = 'shopping_cart'; // Shopping cart collection

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch all items for the logged-in user
    const items = await collection.find({ email }).toArray();

    // Close connection
    await client.close();

    // Respond with the items
    return new Response(
      JSON.stringify({ items }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch cart items' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

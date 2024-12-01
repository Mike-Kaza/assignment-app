
import { MongoClient } from 'mongodb';

export async function GET(req) {
  try {
    const url = 'mongodb+srv://mikekazakovas123:Mariusma5*@cluster0.douvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const client = new MongoClient(url);
    const dbName = 'test'; //

    await client.connect();
    const db = client.db(dbName);

    //fetch all orders from the "orders" collection
    const orders = await db.collection('orders').find({}).toArray();

    // Close the MongoDB connection
    await client.close();

    // Respond with the list of orders
    return new Response(
      JSON.stringify({ orders }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch orders' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

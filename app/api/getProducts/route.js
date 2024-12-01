
import { MongoClient } from 'mongodb';

export async function GET() {
  const url = 'mongodb+srv://mikekazakovas123:Mariusma5*@cluster0.douvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(url);
  const dbName = 'test';

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas server');

    const db = client.db(dbName);
    const collection = db.collection('products');
    const products = await collection.find({}).toArray(); //fetch all products

    // Return the response using the new Response API
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    await client.close();
  }
}

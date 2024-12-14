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

    const { searchParams } = new URL(req.url);
    const pname = searchParams.get('pname'); // Product name from query params
    const email = session.email; // Use the logged-in user's email


    const url = 'mongodb+srv://mikekazakovas123:Mariusma5*@cluster0.douvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const client = new MongoClient(url);
    const dbName = 'test';
    const collectionName = 'shopping_cart';
    const productsCollectionName = 'products';

    await client.connect();
    const db = client.db(dbName);

    //Fetch the product details from the "products" collection
    const product = await db.collection(productsCollectionName).findOne({ pname });

    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare the item to add to the cart
    const cartItem = {
      pname: product.pname,
      price: product.price,
      description: product.description,
      email, //Associate cart item with the logged-in user
    };

    // Insert the item into the "shopping_cart" collection
    await db.collection(collectionName).insertOne(cartItem);

    // Close connection
    await client.close();

    // Respond with success
    return new Response(
      JSON.stringify({ message: 'Item added to cart successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error adding to cart:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to add item to cart' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

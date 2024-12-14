import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export async function POST(req) {
  //request body to get email, password, and account type
  const { email, password, acc_type } = await req.json();

  const url = process.env.MONGO_URI;
  const client = new MongoClient(url);
  const dbName = 'app';

  try {
    //connect to DB and get the user collection
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('login');

    //check if a user with the same email already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
    }

    //create a new user
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = {
      email,
      pass: hashedPassword,
      acc_type: acc_type || 'customer', //default to customer
    };

    //insert the new user into the collection
    await collection.insertOne(newUser);

    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  } finally {
    await client.close();
  }
}



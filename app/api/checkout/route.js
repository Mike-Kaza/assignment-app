import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';
import { getCustomSession } from '../sessionCode.js'; // Session management

export async function POST(req) {
  try {
    const session = await getCustomSession(req); // Fetch the session
    if (!session?.email) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const email = session.email; // User's email
    const url = 'mongodb+srv://mikekazakovas123:Mariusma5*@cluster0.douvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const client = new MongoClient(url);
    const dbName = 'test'; // Your database name

    await client.connect();
    const db = client.db(dbName);

    // Fetch all cart items for the user
    const cartItems = await db.collection('shopping_cart').find({ email }).toArray();

    if (cartItems.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart is empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare product names array
    const productNames = cartItems.map(item => item.pname);

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    // Store the order in the "orders" collection
    const order = {
      email,
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      products: productNames,
      total: parseFloat(total.toFixed(2)), // Round total to 2 decimals
    };

    await db.collection('orders').insertOne(order);

    // Clear the user's shopping cart
    await db.collection('shopping_cart').deleteMany({ email });

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail
        pass: 'your-email-password', // Replace with your Gmail App Password
      },
    });

    // Email content
    const mailOptions = {
      from: '"Krispy Kreme App" <your-email@gmail.com>',
      to: email,
      subject: 'Order Confirmation',
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order placed on <strong>${order.date}</strong>!</p>
        <p>Here are the details:</p>
        <ul>
          ${order.products.map(product => `<li>${product}</li>`).join('')}
        </ul>
        <p>Total: <strong>$${order.total}</strong></p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    // Close the MongoDB connection
    await client.close();

    return new Response(
      JSON.stringify({ message: 'Order placed successfully! Check your email for confirmation.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error during checkout:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to place order' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}



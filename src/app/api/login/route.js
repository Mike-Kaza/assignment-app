import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Get user input from request body
    const { email, password } = await request.json();

    // Validate user input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    // Compare password with hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    // Set user session (cookie-based or in-memory)
    request.session.userId = user._id;
    request.session.role = user.role;

    // Respond with success message
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}

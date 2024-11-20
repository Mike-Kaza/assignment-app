import { NextResponse } from 'next/server';  // Importing Next.js response helper
import connectMongo from '../../../lib/mongodb';  // MongoDB connection helper
import User from '../../../models/User';  // User model
import bcrypt from 'bcryptjs';  // Password hashing

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Get user input from request body
    const { name, email, password, role } = await request.json();

    // Validate user input
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}

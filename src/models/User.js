import mongoose from 'mongoose';

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Name is required
  },
  email: {
    type: String,
    required: true,  // Email is required
    unique: true,    // Email should be unique
  },
  password: {
    type: String,
    required: true,  // Password is required
  },
  role: {
    type: String,
    enum: ['customer', 'manager'],  // Role can be either 'customer' or 'manager'
    default: 'customer',            // Default role is 'customer'
  },
}, { timestamps: true });  // Automatically create 'createdAt' and 'updatedAt' fields

// Create and export the User model
export default mongoose.models.User || mongoose.model('User', UserSchema);

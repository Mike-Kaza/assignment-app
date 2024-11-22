import mongoose from 'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
  pname: { 
    type: String, 
    required: true, 
    trim: true // Ensures no unnecessary spaces are included in the product name
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    default: ''  // Optional, in case you want to add an image URL in the future
  },
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

// Create and export the Product model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;

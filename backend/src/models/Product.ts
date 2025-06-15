import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  images: [String],
  basePrice: { type: Number, required: true },
  specifications: {
    range: String,
    topSpeed: String,
    acceleration: String,
    power: String,
  },
  configurations: {
    variants: [{ name: String, price: Number }],
    colors: [{ name: String, price: Number, hex: String }],
    wheels: [{ name: String, price: Number }],
    interiors: [{ name: String, price: Number }],
  },
});

export default mongoose.model('Product', productSchema); 
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // required: true after auth
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  configuration: {
    variant: String,
    color: String,
    wheels: String,
    interior: String,
  },
  totalPrice: Number,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema); 
import express from 'express';
import Order from '../models/Order';
import { auth, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Place order (protected)
router.post('/', auth, async (req: AuthRequest, res) => {
  try {
    const { productId, configuration, totalPrice, shippingAddress } = req.body;
    const order = new Order({
      user: req.user.id,
      product: productId,
      configuration,
      totalPrice,
      shippingAddress,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Order failed' });
  }
});

export default router;
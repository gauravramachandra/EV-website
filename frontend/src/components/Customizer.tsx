import React, { useState } from 'react';

import api from '../api';

interface Product {
  _id: string;
  name: string;
  basePrice: number;
  configurations: {
    variants: { name: string; price: number }[];
    colors: { name: string; price: number; hex: string }[];
    wheels: { name: string; price: number }[];
    interiors: { name: string; price: number }[];
  };
}

interface CustomizerProps {
  product: Product;
  onBack: () => void;
}

const Customizer: React.FC<CustomizerProps> = ({ product, onBack }) => {
  const [variant, setVariant] = useState(product.configurations.variants[0]);
  const [color, setColor] = useState(product.configurations.colors[0]);
  const [wheels, setWheels] = useState(product.configurations.wheels[0]);
  const [interior, setInterior] = useState(product.configurations.interiors[0]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  const totalPrice =
    product.basePrice +
    (variant?.price || 0) +
    (color?.price || 0) +
    (wheels?.price || 0) +
    (interior?.price || 0);

  const handleOrder = async () => {
    setSubmitting(true);
    setError('');
    setSuccess(false);
    setNotLoggedIn(false);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setNotLoggedIn(true);
        setSubmitting(false);
        return;
      }
      await api.post('/orders', {
        productId: product._id,
        configuration: {
          variant: variant.name,
          color: color.name,
          wheels: wheels.name,
          interior: interior.name,
        },
        totalPrice,
        shippingAddress: {
          street: '123 Demo St',
          city: 'Demo City',
          state: 'Demo State',
          zipCode: '12345',
          country: 'Demo Country',
        },
      });
      setSuccess(true);
    } catch (err: any) {
      setError('Order failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-black/80 rounded-lg shadow-lg p-8 mt-8">
      <button onClick={onBack} className="mb-4 text-white underline">&larr; Back to Product</button>
      <h2 className="text-2xl font-bold text-white mb-6">Customize Your {product.name}</h2>
      <div className="space-y-6">
        {/* Variant */}
        <div>
          <div className="text-white mb-2 font-semibold">Variant</div>
          <div className="flex gap-4">
            {product.configurations.variants.map(v => (
              <button
                key={v.name}
                className={`px-4 py-2 rounded border ${variant.name === v.name ? 'bg-white text-black font-bold' : 'bg-black text-white border-white/30'} transition`}
                onClick={() => setVariant(v)}
              >
                {v.name} {v.price > 0 && <span className="text-xs">(+${v.price})</span>}
              </button>
            ))}
          </div>
        </div>
        {/* Color */}
        <div>
          <div className="text-white mb-2 font-semibold">Color</div>
          <div className="flex gap-4">
            {product.configurations.colors.map(c => (
              <button
                key={c.name}
                className={`px-4 py-2 rounded border flex items-center gap-2 ${color.name === c.name ? 'bg-white text-black font-bold' : 'bg-black text-white border-white/30'} transition`}
                onClick={() => setColor(c)}
              >
                <span className="w-5 h-5 rounded-full border border-gray-300" style={{ background: c.hex }} />
                {c.name} {c.price > 0 && <span className="text-xs">(+${c.price})</span>}
              </button>
            ))}
          </div>
        </div>
        {/* Wheels */}
        <div>
          <div className="text-white mb-2 font-semibold">Wheels</div>
          <div className="flex gap-4">
            {product.configurations.wheels.map(w => (
              <button
                key={w.name}
                className={`px-4 py-2 rounded border ${wheels.name === w.name ? 'bg-white text-black font-bold' : 'bg-black text-white border-white/30'} transition`}
                onClick={() => setWheels(w)}
              >
                {w.name} {w.price > 0 && <span className="text-xs">(+${w.price})</span>}
              </button>
            ))}
          </div>
        </div>
        {/* Interior */}
        <div>
          <div className="text-white mb-2 font-semibold">Interior</div>
          <div className="flex gap-4">
            {product.configurations.interiors.map(i => (
              <button
                key={i.name}
                className={`px-4 py-2 rounded border ${interior.name === i.name ? 'bg-white text-black font-bold' : 'bg-black text-white border-white/30'} transition`}
                onClick={() => setInterior(i)}
              >
                {i.name} {i.price > 0 && <span className="text-xs">(+${i.price})</span>}
              </button>
            ))}
          </div>
        </div>
        {/* Total Price */}
        <div className="text-xl text-white font-bold mt-6">Total Price: ${totalPrice.toLocaleString()}</div>
        {/* Order Button */}
        <button
          className="bg-white text-black px-8 py-3 rounded-md font-semibold text-lg shadow hover:bg-gray-200 transition mt-4"
          onClick={handleOrder}
          disabled={submitting}
        >
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
        {notLoggedIn && <div className="text-red-400 mt-4">You must be logged in to place an order.</div>}
        {success && <div className="text-green-400 mt-4">Order placed successfully!</div>}
        {error && <div className="text-red-400 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default Customizer;
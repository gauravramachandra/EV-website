import React, { useEffect, useState } from 'react';
import api from '../api';

interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  basePrice: number;
  specifications: {
    range: string;
    topSpeed: string;
    acceleration: string;
    power: string;
  };
  configurations: {
    variants: { name: string; price: number }[];
    colors: { name: string; price: number; hex: string }[];
    wheels: { name: string; price: number }[];
    interiors: { name: string; price: number }[];
  };
}

interface ProductDetailProps {
  productId: string;
  onCustomize: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onCustomize }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (api.get<Product>(`/products/${productId}`) as Promise<any>)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <div className="text-center py-12 text-lg text-gray-400">Loading...</div>;
  if (!product) return <div className="text-center py-12 text-lg text-red-400">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto bg-black/80 rounded-lg shadow-lg p-8 mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image carousel */}
        <div className="flex-1 flex flex-col items-center">
          <img src={product.images[0]} alt={product.name} className="rounded-lg w-full max-w-md object-cover" />
          {/* Add carousel controls if multiple images */}
        </div>
        {/* Product info */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-2">{product.name}</h2>
          <p className="text-lg text-gray-300 mb-4">{product.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-gray-400">Range</div>
              <div className="text-xl text-white font-semibold">{product.specifications.range}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Top Speed</div>
              <div className="text-xl text-white font-semibold">{product.specifications.topSpeed}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">0-60 mph</div>
              <div className="text-xl text-white font-semibold">{product.specifications.acceleration}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Power</div>
              <div className="text-xl text-white font-semibold">{product.specifications.power}</div>
            </div>
          </div>
          <button
            className="bg-white text-black px-8 py-3 rounded-md font-semibold text-lg shadow hover:bg-gray-200 transition"
            onClick={() => onCustomize(product)}
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
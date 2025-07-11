import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductDetail from './components/ProductDetail';
import Customizer from './components/Customizer';
import api from './api';

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

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customizing, setCustomizing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching products...');
    api.get<Product[]>('/products')
      .then(res => {
        console.log('Products loaded:', res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        console.error('Error details:', err.response?.data);
        setLoading(false);
      });
  }, []);

  // Navbar links for smooth scroll
  const navbarLinks = products.map(product => ({
    name: product.name,
    href: `#${product._id}`
  }));

  return (
    <div className="relative bg-black min-h-screen">
      <Navbar links={navbarLinks} />
      <main>
        {loading && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-white text-xl">Loading Tesla Models...</div>
          </div>
        )}
        
        {!loading && products.length === 0 && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="text-white text-xl mb-4">No Tesla models available</div>
              <div className="text-gray-400">Check console for API connection issues</div>
            </div>
          </div>
        )}

        {/* Show hero sections if no product selected */}
        {!selectedProduct && !customizing && products.length > 0 && (
          <>
            {products.map((product, idx) => (
              <section id={product._id} key={product._id} className="fade-in-section">
                <Hero
                  title={product.name}
                  subtitle={product.description}
                  backgroundImage={product.images[0]}
                  ctaPrimary="View Details"
                  ctaSecondary="Customize"
                  onPrimary={() => setSelectedProduct(product)}
                  onSecondary={() => { setSelectedProduct(product); setCustomizing(true); }}
                  nextSectionId={products[idx + 1]?._id}
                />
              </section>
            ))}
          </>
        )}
        {/* Show product detail */}
        {selectedProduct && !customizing && (
          <ProductDetail
            productId={selectedProduct._id}
            onCustomize={product => { setSelectedProduct(product); setCustomizing(true); }}
          />
        )}
        {/* Show customizer */}
        {selectedProduct && customizing && (
          <Customizer
            product={selectedProduct}
            onBack={() => setCustomizing(false)}
          />
        )}
      </main>
      <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 1.2s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default App;

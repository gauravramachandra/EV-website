import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductDetail from './components/ProductDetail';
import Customizer from './components/Customizer';
import axios from 'axios';

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

  useEffect(() => {
    axios.get<Product[]>('/api/products').then(res => setProducts(res.data));
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
        {/* Show hero sections if no product selected */}
        {!selectedProduct && !customizing && (
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

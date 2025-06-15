import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

const products = [
  {
    name: 'Model S',
    description: 'Plaid. Beyond Ludicrous.',
    images: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-New-Hero-Desktop-NA.png',
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-New-Interior-Desktop-NA.png'
    ],
    basePrice: 89990,
    specifications: {
      range: '396 mi',
      topSpeed: '200 mph',
      acceleration: '1.99 s 0-60 mph',
      power: '1,020 hp'
    },
    configurations: {
      variants: [
        { name: 'Long Range', price: 0 },
        { name: 'Plaid', price: 20000 }
      ],
      colors: [
        { name: 'Pearl White Multi-Coat', price: 0, hex: '#F4F4F4' },
        { name: 'Solid Black', price: 1500, hex: '#171A20' },
        { name: 'Deep Blue Metallic', price: 1500, hex: '#2B3C6B' }
      ],
      wheels: [
        { name: '19" Tempest Wheels', price: 0 },
        { name: '21" Arachnid Wheels', price: 4500 }
      ],
      interiors: [
        { name: 'All Black', price: 0 },
        { name: 'Black and White', price: 2000 },
        { name: 'Cream', price: 2000 }
      ]
    }
  },
  {
    name: 'Model 3',
    description: 'Quickest acceleration—from zero to 60 mph* in as little as 3.1 seconds.',
    images: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Exterior-Hero-Desktop-LHD.jpg',
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Charging-Slide-1-Desktop-NA.jpg'
    ],
    basePrice: 42990,
    specifications: {
      range: '358 mi',
      topSpeed: '162 mph',
      acceleration: '3.1 s 0-60 mph',
      power: '450 hp'
    },
    configurations: {
      variants: [
        { name: 'Rear-Wheel Drive', price: 0 },
        { name: 'Long Range', price: 5000 },
        { name: 'Performance', price: 9000 }
      ],
      colors: [
        { name: 'Pearl White Multi-Coat', price: 0, hex: '#F4F4F4' },
        { name: 'Solid Black', price: 1000, hex: '#171A20' },
        { name: 'Deep Blue Metallic', price: 1000, hex: '#2B3C6B' }
      ],
      wheels: [
        { name: '18" Aero Wheels', price: 0 },
        { name: '19" Sport Wheels', price: 1500 }
      ],
      interiors: [
        { name: 'All Black', price: 0 },
        { name: 'Black and White', price: 1000 }
      ]
    }
  },
  {
    name: 'Model X',
    description: 'The best SUV to drive, and the best SUV to be driven in.',
    images: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-New-Hero-Desktop.jpg',
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-New-FSD-Desktop-NA.jpg'
    ],
    basePrice: 99990,
    specifications: {
      range: '333 mi',
      topSpeed: '155 mph',
      acceleration: '2.5 s 0-60 mph',
      power: '1,020 hp'
    },
    configurations: {
      variants: [
        { name: 'Dual Motor', price: 0 },
        { name: 'Plaid', price: 20000 }
      ],
      colors: [
        { name: 'Pearl White Multi-Coat', price: 0, hex: '#F4F4F4' },
        { name: 'Solid Black', price: 1500, hex: '#171A20' },
        { name: 'Deep Blue Metallic', price: 1500, hex: '#2B3C6B' }
      ],
      wheels: [
        { name: '20" Cyberstream Wheels', price: 0 },
        { name: '22" Turbine Wheels', price: 5500 }
      ],
      interiors: [
        { name: 'All Black', price: 0 },
        { name: 'Black and White', price: 2000 },
        { name: 'Cream', price: 2000 }
      ]
    }
  }
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded!');
  await mongoose.disconnect();
}

seed(); 
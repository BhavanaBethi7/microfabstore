// backend/productsSeeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Silicon Wafer',
    brand: 'MicroFab Inc.',
    category: 'Wafer',
    description: 'Prime grade silicon wafer for semiconductor fabrication.',
    price: 199.99,
    image: '/uploads/Si Wafer.jpg', // ✅ correct path
    stock: 25,
  },
  // Add more products here...
];


const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    const created = await Product.insertMany(products);
    console.log(`🌱 Seeded ${created.length} products`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();

import mongoose from 'mongoose';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI!;

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to MongoDB.');
    return;
  }

  console.log('Attempting to connect to MongoDB...');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default dbConnect;

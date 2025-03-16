import mongoose from 'mongoose';
import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI!;

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(MONGODB_URI);
}

export default dbConnect;

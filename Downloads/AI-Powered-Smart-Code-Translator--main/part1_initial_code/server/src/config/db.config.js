import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI?.trim();

    if (!mongoURI) {
      console.warn('MONGO_URI is not configured. Using in-memory auth fallback.');
      return false;
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('Running without database. Auth will fall back to local memory.');
    return false;
  }
};

export const isDatabaseConnected = () => mongoose.connection.readyState === 1;

export default connectDB;

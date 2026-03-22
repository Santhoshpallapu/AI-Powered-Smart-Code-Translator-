import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/code-assistant';

    if (!mongoURI) {
      console.warn('MONGO_URI not found in environment variables. Database features will be disabled.');
      return;
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('Running without database. Some features may not work.');
    // Don't exit the process, just warn
  }
};

export default connectDB;

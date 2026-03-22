import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use('/api', routes);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'AI-Powered Code Assistant API',
    version: '1.0.0',
    status: 'running'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

export default app;

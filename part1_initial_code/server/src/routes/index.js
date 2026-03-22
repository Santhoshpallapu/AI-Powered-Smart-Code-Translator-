import express from 'express';
import authRoutes from './auth.routes.js';
import codeRoutes from './code.routes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/code', codeRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    services: {
      auth: 'available',
      code: 'available'
    }
  });
});

export default router;

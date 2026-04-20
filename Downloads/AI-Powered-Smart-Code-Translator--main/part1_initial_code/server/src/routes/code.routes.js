import express from 'express';
import {
  processCodeRequest,
  debugCode,
  explainCode,
  optimizeCode,
  reviewCode,
  generateTests,
  analyzeExecution,
  generateDocumentation,
  refactorCode,
  translateCode
} from '../controllers/code.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// General code processing endpoint
router.post('/process', processCodeRequest);

// Specific code assistance endpoints
router.post('/translate', translateCode);
router.post('/debug', debugCode);
router.post('/explain', explainCode);
router.post('/optimize', optimizeCode);
router.post('/review', reviewCode);
router.post('/tests', generateTests);
router.post('/execute', analyzeExecution);
router.post('/document', generateDocumentation);
router.post('/refactor', refactorCode);

export default router;
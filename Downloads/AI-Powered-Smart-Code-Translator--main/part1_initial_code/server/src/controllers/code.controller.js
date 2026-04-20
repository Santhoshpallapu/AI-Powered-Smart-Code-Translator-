import aiService from '../services/ai.service.js';
import { SUPPORTED_LANGUAGES, REQUEST_TYPES } from '../constants/prompt.js';

/**
 * Code Controller - Handles code assistance requests
 */

/**
 * Translate code endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const translateCode = async (req, res) => {
  try {
    const { code, language, targetLanguage, requestType, additionalContext } = req.body;

    // Validate required fields
    if (!code || !language || !targetLanguage || !requestType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language, targetLanguage, requestType'
      });
    }

    // Validate language
    if (!SUPPORTED_LANGUAGES[language.toUpperCase()]) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}. Supported languages: ${Object.values(SUPPORTED_LANGUAGES).join(', ')}`
      });
    }

    // Validate target language
    if (!SUPPORTED_LANGUAGES[targetLanguage.toUpperCase()]) {
      return res.status(400).json({
        success: false,
        error: `Unsupported target language: ${targetLanguage}. Supported languages: ${Object.values(SUPPORTED_LANGUAGES).join(', ')}`
      });
    }

    // Validate request type
    if (!REQUEST_TYPES[requestType.toUpperCase()]) {
      return res.status(400).json({
        success: false,
        error: `Unsupported request type: ${requestType}. Supported types: ${Object.values(REQUEST_TYPES).join(', ')}`
      });
    }

    // Process the translation request
    const result = await aiService.processCodeRequest(code, language, requestType, additionalContext || `Translate this code from ${language} to ${targetLanguage} while maintaining the same functionality.`);

    if (result.success) {
      res.json({
        success: true,
        response: result.response,
        metadata: result.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        metadata: result.metadata
      });
    }

  } catch (error) {
    console.error('Translate Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

/**
 * Process code assistance request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const processCodeRequest = async (req, res) => {
  try {
    const { code, language, requestType, additionalContext } = req.body;

    // Validate required fields
    if (!code || !language || !requestType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language, requestType'
      });
    }

    // Validate language
    if (!SUPPORTED_LANGUAGES[language.toUpperCase()]) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}. Supported languages: ${Object.values(SUPPORTED_LANGUAGES).join(', ')}`
      });
    }

    // Validate request type
    if (!REQUEST_TYPES[requestType.toUpperCase()]) {
      return res.status(400).json({
        success: false,
        error: `Unsupported request type: ${requestType}. Supported types: ${Object.values(REQUEST_TYPES).join(', ')}`
      });
    }

    // Process the request
    const result = await aiService.processCodeRequest(code, language, requestType, additionalContext || '');

    if (result.success) {
      res.json({
        success: true,
        response: result.response,
        metadata: result.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        metadata: result.metadata
      });
    }

  } catch (error) {
    console.error('Code Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

/**
 * Debug code endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const debugCode = async (req, res) => {
  try {
    const { code, language, error } = req.body;

    if (!code || !language || !error) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language, error'
      });
    }

    const result = await aiService.debugCode(code, language, error);

    if (result.success) {
      res.json({
        success: true,
        response: result.response,
        metadata: result.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        metadata: result.metadata
      });
    }

  } catch (error) {
    console.error('Debug Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

/**
 * Explain code endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const explainCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language'
      });
    }

    const result = await aiService.explainCode(code, language);

    if (result.success) {
      res.json({
        success: true,
        response: result.response,
        metadata: result.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        metadata: result.metadata
      });
    }

  } catch (error) {
    console.error('Explain Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

/**
 * Optimize code endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const optimizeCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language'
      });
    }

    const result = await aiService.optimizeCode(code, language);

    if (result.success) {
      res.json({
        success: true,
        response: result.response,
        metadata: result.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        metadata: result.metadata
      });
    }

  } catch (error) {
    console.error('Optimize Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

/**
 * Review code endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language'
      });
    }

    const result = await aiService.reviewCode(code, language);

    if (result.success) {
      res.json({
        success: true,
        response: result.response,
        metadata: result.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        metadata: result.metadata
      });
    }

  } catch (error) {
    console.error('Review Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

/**
 * Generate tests endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const generateTests = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language'
      });
    }

    const result = await aiService.generateTests(code, language);

    if (result.success) {
      res.json({
        success: true,
        response: result.response,
        metadata: result.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        metadata: result.metadata
      });
    }

  } catch (error) {
    console.error('Test Generation Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

/**
 * Analyze execution endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const analyzeExecution = async (req, res) => {
  try {
    const { code, language, userRequest } = req.body;

    if (!code || !language || !userRequest) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language, userRequest'
      });
    }

    const result = await aiService.analyzeExecution(code, language, userRequest);

    if (result.success) {
      res.json({
        success: true,
        response: result.response,
        metadata: result.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        metadata: result.metadata
      });
    }

  } catch (error) {
    console.error('Execution Analysis Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

/**
 * Generate documentation endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const generateDocumentation = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language'
      });
    }

    const result = await aiService.generateDocumentation(code, language);

    if (result.success) {
      res.json({
        success: true,
        response: result.response,
        metadata: result.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        metadata: result.metadata
      });
    }

  } catch (error) {
    console.error('Documentation Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};

/**
 * Refactor code endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const refactorCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, language'
      });
    }

    const result = await aiService.refactorCode(code, language);

    if (result.success) {
      res.json({
        success: true,
        response: result.response,
        metadata: result.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        metadata: result.metadata
      });
    }

  } catch (error) {
    console.error('Refactor Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
};
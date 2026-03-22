import { getGenerativeModel } from '../config/google.config.js';
import { getPromptByType, SYSTEM_PROMPT } from '../utils/prompt.js';
import { SUPPORTED_LANGUAGES, REQUEST_TYPES } from '../constants/prompt.js';

/**
 * AI Service for code assistance using Google Gemini
 */
class AIService {
  constructor() {
    this.model = getGenerativeModel();
  }

  /**
   * Process a code assistance request
   * @param {string} code - The user's code
   * @param {string} language - Programming language
   * @param {string} requestType - Type of request (debug, explain, etc.)
   * @param {string} additionalContext - Additional context for the request
   * @returns {Promise<Object>} - AI response
   */
  async processCodeRequest(code, language, requestType, additionalContext = '') {
    try {
      // Validate inputs
      if (!code || !language || !requestType) {
        throw new Error('Missing required parameters: code, language, or requestType');
      }

      if (!SUPPORTED_LANGUAGES[language.toUpperCase()]) {
        throw new Error(`Unsupported language: ${language}`);
      }

      if (!REQUEST_TYPES[requestType.toUpperCase()]) {
        throw new Error(`Unsupported request type: ${requestType}`);
      }

      // Generate prompt
      const prompt = getPromptByType(requestType, code, language, additionalContext);

      // Create full prompt with system instructions
      const fullPrompt = `${SYSTEM_PROMPT}\n\n${prompt}`;

      // Generate response
      const result = await this.model.generateContent(fullPrompt);
      const response = result.response;
      const text = response.text();

      return {
        success: true,
        response: text,
        metadata: {
          language,
          requestType,
          timestamp: new Date(),
          model: 'gemini-1.5-pro'
        }
      };

    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        success: false,
        error: error.message,
        metadata: {
          language,
          requestType,
          timestamp: new Date()
        }
      };
    }
  }

  /**
   * Debug code
   * @param {string} code - Code to debug
   * @param {string} language - Programming language
   * @param {string} error - Error description
   * @returns {Promise<Object>} - Debug response
   */
  async debugCode(code, language, error) {
    return this.processCodeRequest(code, language, 'debug', error);
  }

  /**
   * Explain code
   * @param {string} code - Code to explain
   * @param {string} language - Programming language
   * @returns {Promise<Object>} - Explanation response
   */
  async explainCode(code, language) {
    return this.processCodeRequest(code, language, 'explain');
  }

  /**
   * Optimize code
   * @param {string} code - Code to optimize
   * @param {string} language - Programming language
   * @returns {Promise<Object>} - Optimization response
   */
  async optimizeCode(code, language) {
    return this.processCodeRequest(code, language, 'optimize');
  }

  /**
   * Review code
   * @param {string} code - Code to review
   * @param {string} language - Programming language
   * @returns {Promise<Object>} - Review response
   */
  async reviewCode(code, language) {
    return this.processCodeRequest(code, language, 'review');
  }

  /**
   * Generate test cases
   * @param {string} code - Code to test
   * @param {string} language - Programming language
   * @returns {Promise<Object>} - Test generation response
   */
  async generateTests(code, language) {
    return this.processCodeRequest(code, language, 'test');
  }

  /**
   * Execute code (conceptual - returns analysis)
   * @param {string} code - Code to analyze for execution
   * @param {string} language - Programming language
   * @param {string} userRequest - User's execution request
   * @returns {Promise<Object>} - Execution analysis response
   */
  async analyzeExecution(code, language, userRequest) {
    return this.processCodeRequest(code, language, 'execute', userRequest);
  }

  /**
   * Generate documentation
   * @param {string} code - Code to document
   * @param {string} language - Programming language
   * @returns {Promise<Object>} - Documentation response
   */
  async generateDocumentation(code, language) {
    return this.processCodeRequest(code, language, 'document');
  }

  /**
   * Refactor code
   * @param {string} code - Code to refactor
   * @param {string} language - Programming language
   * @returns {Promise<Object>} - Refactoring response
   */
  async refactorCode(code, language) {
    return this.processCodeRequest(code, language, 'refactor');
  }
}

export default new AIService();
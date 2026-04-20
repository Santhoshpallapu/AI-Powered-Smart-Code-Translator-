import api from './api.js';

export const codeService = {
  // Process general code request
  processCode: async (codeData) => {
    return api.post('/code/process', codeData);
  },

  // Debug code
  debugCode: async (code, language, error) => {
    return api.post('/code/debug', { code, language, error });
  },

  // Explain code
  explainCode: async (code, language) => {
    return api.post('/code/explain', { code, language });
  },

  // Optimize code
  optimizeCode: async (code, language) => {
    return api.post('/code/optimize', { code, language });
  },

  // Review code
  reviewCode: async (code, language) => {
    return api.post('/code/review', { code, language });
  },

  // Generate tests
  generateTests: async (code, language) => {
    return api.post('/code/tests', { code, language });
  },

  // Analyze execution
  analyzeExecution: async (code, language, userRequest) => {
    return api.post('/code/execute', { code, language, userRequest });
  },

  // Generate documentation
  generateDocumentation: async (code, language) => {
    return api.post('/code/document', { code, language });
  },

  // Refactor code
  refactorCode: async (code, language) => {
    return api.post('/code/refactor', { code, language });
  }
};

export default codeService;

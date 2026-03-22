/**
 * Prompt templates and utilities for Gemini LLM interactions
 */

export const SYSTEM_PROMPT = `You are an expert AI code assistant and JavaScript/Python/Java/C++ programming expert. 
You help users write, debug, optimize, and understand code. 
Provide clear, concise, and helpful responses with code examples when appropriate.
Focus on best practices and clean code principles.`;

/**
 * Generate a prompt for code execution assistance
 * @param {string} code - The user's code
 * @param {string} language - Programming language
 * @param {string} userRequest - User's specific request
 * @returns {string} - Formatted prompt for the AI
 */
export const generateCodeExecutionPrompt = (code, language, userRequest) => {
  return `
Language: ${language}

User Request: ${userRequest}

Code:
\`\`\`${language}
${code}
\`\`\`

Please analyze this code and help with the request above. Provide:
1. Analysis of the code
2. Any issues or improvements
3. Suggestions for optimization
4. Example output if applicable
`;
};

/**
 * Generate a prompt for code debugging
 * @param {string} code - The user's code
 * @param {string} language - Programming language
 * @param {string} error - Error message or description
 * @returns {string} - Formatted prompt for debugging
 */
export const generateDebugPrompt = (code, language, error) => {
  return `
Language: ${language}

Error/Issue: ${error}

Code:
\`\`\`${language}
${code}
\`\`\`

Please help debug this code. Provide:
1. Identify the root cause of the issue
2. Explain what's going wrong
3. Provide the corrected code
4. Explain the fix
5. Tips to prevent similar issues
`;
};

/**
 * Generate a prompt for code explanation
 * @param {string} code - The user's code
 * @param {string} language - Programming language
 * @returns {string} - Formatted prompt for explanation
 */
export const generateExplanationPrompt = (code, language) => {
  return `
Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Please explain this code in detail. Cover:
1. What the code does
2. Key concepts and algorithms used
3. Function/method purposes
4. Input and output
5. Any important considerations
`;
};

/**
 * Generate a prompt for code optimization
 * @param {string} code - The user's code
 * @param {string} language - Programming language
 * @returns {string} - Formatted prompt for optimization
 */
export const generateOptimizationPrompt = (code, language) => {
  return `
Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Please optimize this code. Analyze and provide:
1. Performance issues
2. Code readability improvements
3. Best practices violations
4. Optimized version of the code
5. Explanation of improvements made
6. Complexity analysis (time and space)
`;
};

/**
 * Generate a prompt for code review
 * @param {string} code - The user's code
 * @param {string} language - Programming language
 * @returns {string} - Formatted prompt for code review
 */
export const generateCodeReviewPrompt = (code, language) => {
  return `
Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Please perform a comprehensive code review. Check for:
1. Code quality and maintainability
2. Performance issues
3. Security vulnerabilities
4. Best practices compliance
5. Error handling
6. Documentation needs
7. Testing considerations
8. Overall suggestions for improvement
`;
};

/**
 * Generate a prompt for feature implementation
 * @param {string} language - Programming language
 * @param {string} requirement - Feature requirement
 * @returns {string} - Formatted prompt for implementation
 */
export const generateImplementationPrompt = (language, requirement) => {
  return `
Language: ${language}

Feature Requirement:
${requirement}

Please provide:
1. Approach and algorithm explanation
2. Complete implementation code
3. Key considerations
4. Example usage
5. Potential edge cases to handle
6. Testing suggestions
`;
};

/**
 * Generate a prompt for testing code
 * @param {string} code - The user's code
 * @param {string} language - Programming language
 * @returns {string} - Formatted prompt for test generation
 */
export const generateTestPrompt = (code, language) => {
  return `
Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Generate comprehensive test cases for this code. Include:
1. Unit tests for each function/method
2. Edge cases and boundary conditions
3. Error scenarios
4. Example test code
5. Test execution instructions
`;
};

/**
 * Generate a prompt for documentation
 * @param {string} code - The user's code
 * @param {string} language - Programming language
 * @returns {string} - Formatted prompt for documentation
 */
export const generateDocumentationPrompt = (code, language) => {
  return `
Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Generate documentation for this code. Include:
1. File/module description
2. Function/method documentation with parameters and return types
3. Usage examples
4. Dependencies and requirements
5. Installation/setup instructions if applicable
6. API documentation if applicable
`;
};

/**
 * Get the appropriate prompt generator based on request type
 * @param {string} type - Type of request (debug, explain, optimize, etc.)
 * @param {string} code - The user's code
 * @param {string} language - Programming language
 * @param {string} additionalContext - Any additional context
 * @returns {string} - Formatted prompt
 */
export const getPromptByType = (type, code, language, additionalContext) => {
  const typeMap = {
    debug: () => generateDebugPrompt(code, language, additionalContext),
    explain: () => generateExplanationPrompt(code, language),
    optimize: () => generateOptimizationPrompt(code, language),
    review: () => generateCodeReviewPrompt(code, language),
    implement: () => generateImplementationPrompt(language, additionalContext),
    test: () => generateTestPrompt(code, language),
    document: () => generateDocumentationPrompt(code, language),
    execute: () => generateCodeExecutionPrompt(code, language, additionalContext),
  };

  const promptGenerator = typeMap[type] || (() => generateCodeExecutionPrompt(code, language, additionalContext));
  return promptGenerator();
};

/**
 * Format the response from the AI model
 * @param {string} response - Raw response from AI
 * @returns {object} - Formatted response object
 */
export const formatAIResponse = (response) => {
  return {
    success: true,
    content: response,
    timestamp: new Date(),
  };
};

/**
 * Handle API errors
 * @param {Error} error - Error object
 * @returns {object} - Formatted error response
 */
export const handlePromptError = (error) => {
  return {
    success: false,
    error: error.message || 'An error occurred while processing the request',
    timestamp: new Date(),
  };
};

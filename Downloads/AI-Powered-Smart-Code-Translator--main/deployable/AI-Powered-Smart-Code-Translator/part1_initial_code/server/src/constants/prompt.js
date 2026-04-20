/**
 * Prompt constants and templates for the AI Code Assistant
 * Used for Gemini LLM API interactions
 */

// Supported programming languages
export const SUPPORTED_LANGUAGES = {
  JAVASCRIPT: 'javascript',
  PYTHON: 'python',
  JAVA: 'java',
  CPLUSPLUS: 'cpp',
  CSHARP: 'csharp',
  TYPESCRIPT: 'typescript',
  SQL: 'sql',
  HTML: 'html',
  CSS: 'css',
  RUST: 'rust',
  GO: 'go',
  PHP: 'php',
};

// Request types
export const REQUEST_TYPES = {
  DEBUG: 'debug',
  EXPLAIN: 'explain',
  OPTIMIZE: 'optimize',
  REVIEW: 'review',
  IMPLEMENT: 'implement',
  TEST: 'test',
  DOCUMENT: 'document',
  EXECUTE: 'execute',
  REFACTOR: 'refactor',
};

// AI Model constants
export const AI_MODEL = {
  MODEL_NAME: 'gemini-1.5-pro',
  MAX_TOKENS: 4096,
  TEMPERATURE: 0.7,
  TOP_P: 0.9,
  TOP_K: 40,
};

// System prompts for different roles
export const SYSTEM_PROMPTS = {
  DEFAULT: `You are an expert AI code assistant and programming expert. 
You help users write, debug, optimize, and understand code. 
Provide clear, concise, and helpful responses with code examples when appropriate.
Focus on best practices and clean code principles.`,

  DEBUG: `You are an expert debugging assistant. Analyze code for errors and issues.
Help identify root causes and provide solutions. Be thorough and guide users through the debugging process.`,

  REVIEWER: `You are a senior code reviewer. Provide comprehensive feedback on code quality, performance, security, and best practices.
Be constructive and provide specific recommendations for improvement.`,

  EDUCATOR: `You are a helpful programming educator. Explain concepts clearly with examples.
Help users understand the "why" behind coding practices, not just the "how".`,
};

// Prompt templates
export const PROMPT_TEMPLATES = {
  DEBUG: `Language: {language}

Error/Issue: {error}

Code:
\`\`\`{language}
{code}
\`\`\`

Please help debug this code. Provide:
1. Root cause of the issue
2. Explanation of what's going wrong
3. Corrected code
4. Explanation of the fix
5. Tips to prevent similar issues`,

  EXPLAIN: `Language: {language}

Code:
\`\`\`{language}
{code}
\`\`\`

Please explain this code in detail. Cover:
1. What the code does
2. Key concepts and algorithms
3. Function/method purposes
4. Input and output
5. Important considerations`,

  OPTIMIZE: `Language: {language}

Code:
\`\`\`{language}
{code}
\`\`\`

Please optimize this code. Analyze and provide:
1. Performance issues
2. Code readability improvements
3. Best practices violations
4. Optimized version of the code
5. Explanation of improvements
6. Complexity analysis (time and space)`,

  REVIEW: `Language: {language}

Code:
\`\`\`{language}
{code}
\`\`\`

Please perform a comprehensive code review. Check for:
1. Code quality and maintainability
2. Performance issues
3. Security vulnerabilities
4. Best practices compliance
5. Error handling
6. Documentation needs
7. Testing considerations
8. Overall suggestions`,

  IMPLEMENT: `Language: {language}

Feature Requirement:
{requirement}

Please provide:
1. Approach and algorithm explanation
2. Complete implementation code
3. Key considerations
4. Example usage
5. Edge cases to handle
6. Testing suggestions`,

  TEST: `Language: {language}

Code:
\`\`\`{language}
{code}
\`\`\`

Generate comprehensive test cases for this code. Include:
1. Unit tests for each function/method
2. Edge cases and boundary conditions
3. Error scenarios
4. Example test code
5. Test execution instructions`,

  DOCUMENT: `Language: {language}

Code:
\`\`\`{language}
{code}
\`\`\`

Generate documentation for this code. Include:
1. File/module description
2. Function/method documentation with parameters and return types
3. Usage examples
4. Dependencies and requirements
5. Installation/setup instructions
6. API documentation if applicable`,

  REFACTOR: `Language: {language}

Code:
\`\`\`{language}
{code}
\`\`\`

Please refactor this code. Focus on:
1. Code clarity and readability
2. DRY principle (Don't Repeat Yourself)
3. Design pattern improvements
4. Naming conventions
5. Structure organization
6. Refactored version of the code
7. Benefits of the refactoring`,

  EXECUTE: `Language: {language}

User Request: {userRequest}

Code:
\`\`\`{language}
{code}
\`\`\`

Please analyze this code and help with the request. Provide:
1. Analysis of the code
2. Any issues or improvements
3. Suggestions for optimization
4. Example output if applicable`,
};

// Error messages and constants
export const ERROR_MESSAGES = {
  INVALID_LANGUAGE: 'Invalid programming language specified.',
  INVALID_REQUEST_TYPE: 'Invalid request type specified.',
  EMPTY_CODE: 'Code input cannot be empty.',
  API_ERROR: 'Error communicating with AI model.',
  MODEL_ERROR: 'Error processing request with AI model.',
  INVALID_INPUT: 'Invalid input provided.',
  SERVER_ERROR: 'Internal server error.',
  UNAUTHORIZED: 'Unauthorized access.',
  RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  REQUEST_PROCESSED: 'Request processed successfully.',
  CODE_ANALYZED: 'Code analyzed successfully.',
  RESPONSE_GENERATED: 'Response generated successfully.',
};

// Response status codes
export const RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
  PROCESSING: 'processing',
};

// Rate limiting constants
export const RATE_LIMITS = {
  REQUESTS_PER_MINUTE: 30,
  REQUESTS_PER_HOUR: 500,
  REQUESTS_PER_DAY: 5000,
};

// Cache constants
export const CACHE_CONFIG = {
  ENABLED: true,
  TTL: 3600, // 1 hour in seconds
  MAX_SIZE: 100, // Maximum number of cached responses
};

// Validation constants
export const VALIDATION = {
  MIN_CODE_LENGTH: 1,
  MAX_CODE_LENGTH: 50000,
  MIN_PROMPT_LENGTH: 1,
  MAX_PROMPT_LENGTH: 5000,
};

// Response formatting constants
export const RESPONSE_FORMAT = {
  INCLUDE_TIMESTAMP: true,
  INCLUDE_METADATA: true,
  INCLUDE_USAGE: true,
};

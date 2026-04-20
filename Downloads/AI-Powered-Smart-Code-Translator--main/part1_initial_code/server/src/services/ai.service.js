import { getGenerativeModel, hasGoogleApiKey } from '../config/google.config.js';
import { getPromptByType, SYSTEM_PROMPT } from '../utils/prompt.js';
import { SUPPORTED_LANGUAGES, REQUEST_TYPES } from '../constants/prompt.js';

const FALLBACK_HINTS = {
  translate: [
    'Identify the target programming language that best matches your requirements.',
    'Consider language-specific syntax differences and idiomatic patterns.',
    'Map data structures and control flow constructs to the target language equivalents.',
    'Adapt library calls and built-in functions to the target language ecosystem.',
    'Test the translated code to ensure it maintains the same functionality.',
  ],
  debug: [
    'Trace the failing control flow and verify every variable is initialized before use.',
    'Check boundary conditions, null or undefined handling, and assumptions about input shape.',
    'Re-run the smallest reproducible example after each fix to confirm the root cause is resolved.',
  ],
  explain: [
    'Describe the main input, transformation, and output path.',
    'Break the code into logical blocks and summarize each responsibility.',
    'Call out important libraries, side effects, and data flow.',
  ],
  optimize: [
    'Look for repeated work inside loops and move invariant logic out of hot paths.',
    'Reduce unnecessary allocations and duplicate parsing or serialization steps.',
    'Measure before and after changes so performance improvements are verified, not assumed.',
  ],
  review: [
    'Check error handling, naming clarity, and whether responsibilities are cleanly separated.',
    'Review security-sensitive areas such as auth, secrets, and user input handling.',
    'Note missing tests for edge cases and failure paths.',
  ],
  test: [
    'Add happy-path tests first, then expand to invalid input and edge conditions.',
    'Cover branches around authentication, parsing, and fallback behavior.',
    'Assert both returned values and observable side effects.',
  ],
  document: [
    'Document required environment variables and startup steps.',
    'Explain request and response shapes for the key API endpoints.',
    'Include examples for common actions so onboarding stays fast.',
  ],
  execute: [
    'Validate the exact execution context, runtime version, and required dependencies.',
    'Check whether file paths, environment variables, and network access are available.',
    'Compare expected output with actual output to isolate mismatches quickly.',
  ],
  refactor: [
    'Extract duplicated logic into focused helpers with clear names.',
    'Keep behavior unchanged while improving readability and structure.',
    'Move side effects to the edges so the core logic stays easy to test.',
  ],
};

class AIService {
  constructor() {
    this.model = null;
    this.modelName = process.env.GOOGLE_MODEL_NAME?.trim() || 'gemini-2.0-flash';
  }

  getModel() {
    if (!this.model && hasGoogleApiKey()) {
      this.model = getGenerativeModel(this.modelName);
    }

    return this.model;
  }

  buildFallbackResponse(code, language, requestType, additionalContext = '', reason = '') {
    const lineCount = code.split(/\r?\n/).length;
    const preview = code.split(/\r?\n/).slice(0, 12).join('\n');
    const hints = FALLBACK_HINTS[requestType] || FALLBACK_HINTS.execute;
    const contextLine = additionalContext ? `Additional context: ${additionalContext}` : null;
    const reasonLine = reason
      ? `Fallback reason: ${reason}`
      : 'Fallback reason: Local analysis mode is active.';

    // For translation, provide actual translated examples
    if (requestType === 'translate') {
      const translations = this.generateTranslations(code, language, additionalContext);
      
      return [
        'Local translation mode is active.',
        '',
        reasonLine,
        `Original language: ${language}`,
        `Code lines: ${lineCount}`,
        contextLine,
        '',
        'Translation Examples:',
        ...translations.map((trans, index) => `${index + 1}. **${trans.language}**:\n\`\`\`${trans.language.toLowerCase()}\n${trans.translatedCode}\n\`\`\``),
        '',
        'Translation Guidelines:',
        ...hints.map((hint, index) => `${index + 1}. ${hint}`),
        '',
        'Original Code:',
        `\`\`\`${language}`,
        preview,
        '```',
      ]
        .filter(Boolean)
        .join('\n');
    }

    return [
      'Local analysis mode is active.',
      '',
      reasonLine,
      `Language: ${language}`,
      `Request type: ${requestType}`,
      `Code lines: ${lineCount}`,
      contextLine,
      '',
      'Recommended next steps:',
      ...hints.map((hint, index) => `${index + 1}. ${hint}`),
      '',
      'Code preview:',
      `\`\`\`${language}`,
      preview,
      '```',
    ]
      .filter(Boolean)
      .join('\n');
  }

  generateTranslations(code, originalLanguage, additionalContext) {
    const translations = [];
    
    // Extract target language from additional context
    const targetLanguageMatch = additionalContext?.match(/to (\w+)/i);
    const targetLanguage = targetLanguageMatch ? targetLanguageMatch[1].toLowerCase() : 'javascript';
    
    // Simple translation patterns for common code
    if (code.includes('print(') && originalLanguage === 'python') {
      if (targetLanguage === 'javascript') {
        translations.push({
          language: 'JavaScript',
          translatedCode: code.replace(/print\((.*)\)/g, 'console.log($1)')
        });
      } else if (targetLanguage === 'java') {
        translations.push({
          language: 'Java',
          translatedCode: code.replace(/print\((.*)\)/g, 'System.out.println($1);')
        });
      } else if (targetLanguage === 'cpp' || targetLanguage === 'c++') {
        translations.push({
          language: 'C++',
          translatedCode: code.replace(/print\((.*)\)/g, 'std::cout << $1 << std::endl;')
        });
      } else {
        // Default to JavaScript
        translations.push({
          language: 'JavaScript',
          translatedCode: code.replace(/print\((.*)\)/g, 'console.log($1)')
        });
      }
    }
    
    if (code.includes('console.log') && originalLanguage === 'javascript') {
      if (targetLanguage === 'python') {
        translations.push({
          language: 'Python',
          translatedCode: code.replace(/console\.log\((.*)\)/g, 'print($1)')
        });
      } else if (targetLanguage === 'java') {
        translations.push({
          language: 'Java',
          translatedCode: code.replace(/console\.log\((.*)\)/g, 'System.out.println($1);')
        });
      } else {
        // Default to Python
        translations.push({
          language: 'Python',
          translatedCode: code.replace(/console\.log\((.*)\)/g, 'print($1)')
        });
      }
    }
    
    // If no specific translation found, create a generic one
    if (translations.length === 0) {
      const targetLangName = targetLanguage.charAt(0).toUpperCase() + targetLanguage.slice(1);
      translations.push({
        language: targetLangName,
        translatedCode: `// Translation from ${originalLanguage} to ${targetLangName}\n// ${code}`
      });
    }
    
    return translations;
  }

  async processCodeRequest(code, language, requestType, additionalContext = '') {
    try {
      if (!code || !language || !requestType) {
        throw new Error('Missing required parameters: code, language, or requestType');
      }

      if (!SUPPORTED_LANGUAGES[language.toUpperCase()]) {
        throw new Error(`Unsupported language: ${language}`);
      }

      if (!REQUEST_TYPES[requestType.toUpperCase()]) {
        throw new Error(`Unsupported request type: ${requestType}`);
      }

      const prompt = getPromptByType(requestType, code, language, additionalContext);
      const fullPrompt = `${SYSTEM_PROMPT}\n\n${prompt}`;
      const model = this.getModel();

      if (!model) {
        return {
          success: true,
          response: this.buildFallbackResponse(code, language, requestType, additionalContext),
          metadata: {
            language,
            requestType,
            timestamp: new Date(),
            model: 'local-fallback',
          },
        };
      }

      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      const text = response.text();

      return {
        success: true,
        response: text,
          metadata: {
            language,
            requestType,
            timestamp: new Date(),
            model: this.modelName,
          },
        };
    } catch (error) {
      console.warn(`AI service unavailable, using local fallback: ${error.message}`);

      return {
        success: true,
        response: this.buildFallbackResponse(
          code,
          language,
          requestType,
          additionalContext,
          error.message
        ),
        metadata: {
          language,
          requestType,
          timestamp: new Date(),
          model: 'local-fallback',
        },
      };
    }
  }

  async debugCode(code, language, error) {
    return this.processCodeRequest(code, language, 'debug', error);
  }

  async explainCode(code, language) {
    return this.processCodeRequest(code, language, 'explain');
  }

  async optimizeCode(code, language) {
    return this.processCodeRequest(code, language, 'optimize');
  }

  async reviewCode(code, language) {
    return this.processCodeRequest(code, language, 'review');
  }

  async generateTests(code, language) {
    return this.processCodeRequest(code, language, 'test');
  }

  async analyzeExecution(code, language, userRequest) {
    return this.processCodeRequest(code, language, 'execute', userRequest);
  }

  async generateDocumentation(code, language) {
    return this.processCodeRequest(code, language, 'document');
  }

  async refactorCode(code, language) {
    return this.processCodeRequest(code, language, 'refactor');
  }
}

export default new AIService();

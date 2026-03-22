import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const getGenerativeModel = (modelName = 'gemini-1.5-pro') => {
  return genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.9,
      maxOutputTokens: 4096,
    },
  });
};

export default genAI;

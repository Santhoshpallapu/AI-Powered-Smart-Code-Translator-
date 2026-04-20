import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ quiet: true });

export const hasGoogleApiKey = () => Boolean(process.env.GOOGLE_API_KEY?.trim());

export const getGenerativeModel = (
  modelName = process.env.GOOGLE_MODEL_NAME?.trim() || 'gemini-2.0-flash'
) => {
  if (!hasGoogleApiKey()) {
    return null;
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY.trim());

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

export default getGenerativeModel;

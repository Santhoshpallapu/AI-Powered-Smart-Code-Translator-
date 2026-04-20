# AI-Powered Smart Code Translator - Deployment Instructions

## Project Overview
This is a full-stack MERN application with AI-powered code translation and analysis capabilities.

## Fixed Issues
- All syntax errors resolved
- Dependency version conflicts fixed
- Missing .env.example files created
- Client build tested successfully
- Server configuration verified

## Quick Deployment Steps

### 1. Environment Setup
Copy the provided `.env.example` files to `.env`:

**Server:**
```bash
cp part1_initial_code/server/.env.example part1_initial_code/server/.env
```

**Client (optional):**
```bash
cp part1_initial_code/client/.env.example part1_initial_code/client/.env
```

### 2. Install Dependencies
```bash
# Server dependencies
cd part1_initial_code/server
npm install

# Client dependencies
cd ../client
npm install
```

### 3. Development Mode
```bash
# Start server (in server directory)
npm run dev

# Start client (in client directory)  
npm run dev
```

### 4. Production Deployment
```bash
# Build client
cd part1_initial_code/client
npm run build

# Start server (serves both API and built client)
cd ../server
npm start
```

## Environment Variables

### Server (.env)
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string (optional - uses in-memory fallback)
- `JWT_SECRET`: JWT signing secret
- `GOOGLE_API_KEY`: Google AI API key (optional - uses local fallback)
- `GOOGLE_MODEL_NAME`: AI model name (default: gemini-2.0-flash)
- `CLIENT_URL`: Frontend URL (default: http://localhost:5173)

### Client (.env) - Optional
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `VITE_API_URL`: API base URL

## Features
- **Code Translation**: Translate code between multiple programming languages
- **Code Analysis**: Debug, explain, optimize, and review code
- **AI-Powered**: Uses Google Gemini AI with local fallback
- **Authentication**: JWT-based auth with optional Google OAuth
- **Responsive UI**: Modern React interface with Monaco Editor

## Supported Languages
JavaScript, Python, Java, C++, C#, TypeScript, SQL, HTML, CSS, Rust, Go, PHP

## Fallback Behavior
- If MongoDB is unavailable: Uses in-memory authentication
- If Google AI API is unavailable: Uses deterministic local analysis

## Deployment Notes
- The server automatically serves the built client from `/client/dist`
- All API endpoints are prefixed with `/api`
- The application is fully functional without external services
- Default JWT secret is for development only - change in production

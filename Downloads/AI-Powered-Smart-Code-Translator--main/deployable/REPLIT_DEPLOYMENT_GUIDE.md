# Deploy AI-Powered Smart Code Translator to Replit

## Quick Deployment Steps

### 1. Create a New Replit
1. Go to [replit.com](https://replit.com)
2. Click "+ Create Repl"
3. Choose **"Node.js"** template
4. Name it something like "ai-code-translator"
5. Click "Create Repl"

### 2. Upload Your Project Files
1. In the Replit file explorer (left panel), create these folders:
   ```
   part1_initial_code/
   part1_initial_code/server/
   part1_initial_code/client/
   part1_initial_code/server/src/
   part1_initial_code/client/src/
   ```

2. Upload all your project files to the corresponding folders:
   - Server files go to `part1_initial_code/server/`
   - Client files go to `part1_initial_code/client/`

### 3. Set Up Environment Variables
1. In Replit, click the **"Secrets"** tab (lock icon) in the left panel
2. Add these environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   CLIENT_URL=https://your-repl-name.your-username.repl.co
   JWT_SECRET=your-super-secret-jwt-key-change-this
   GOOGLE_API_KEY=  # Leave empty for local mode
   GOOGLE_MODEL_NAME=gemini-2.0-flash
   ```

### 4. Update Package.json for Replit
Create a root `package.json` file:

```json
{
  "name": "ai-code-translator",
  "version": "1.0.0",
  "scripts": {
    "build": "cd part1_initial_code/client && npm install && npm run build",
    "start": "cd part1_initial_code/server && npm install && npm start",
    "dev": "cd part1_initial_code/server && npm install && npm run dev"
  },
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "bcryptjs": "^3.0.3",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.3.1"
  }
}
```

### 5. Create Replit Configuration
Create a `.replit` file in the root:

```ini
[run]
command = "npm run build && npm start"

[env]
NODE_ENV = "production"
PORT = "5000"
```

### 6. Modify Server for Replit
Update `part1_initial_code/server/src/app.js` to handle Replit's URL:

```javascript
// Update the allowedOrigins Set
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://localhost:4173',
  `https://${process.env.REPL_ID}.${process.env.REPL_OWNER}.repl.co`,
  `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`,
]);

if (process.env.CLIENT_URL?.trim()) {
  allowedOrigins.add(process.env.CLIENT_URL.trim());
}
```

### 7. Deploy and Test
1. Click the **"Run"** button at the top
2. Wait for the build to complete
3. Your app will be available at the Replit URL
4. Test the translation features

## Important Notes

### MongoDB Setup (Optional)
For database persistence:
1. Go to [MongoDB Atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Add your IP to whitelist (0.0.0.0/0 for Replit)
4. Get connection string and add to Replit Secrets as `MONGO_URI`

### Google AI API (Optional)
For AI-powered features:
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to Replit Secrets as `GOOGLE_API_KEY`
3. Without this, the app uses local fallback mode

### Troubleshooting
- **Build fails**: Check that all files are uploaded correctly
- **Port errors**: Make sure PORT=5000 in environment variables
- **CORS errors**: Verify CLIENT_URL matches your Replit URL
- **Blank page**: Check browser console for errors

## Features Available on Replit
- Full code translation functionality
- Local fallback mode (no API keys needed)
- User authentication (in-memory)
- Multiple programming languages supported
- Responsive web interface

## Replit-Specific Optimizations
- Automatic HTTPS
- Built-in database (optional)
- Free hosting
- Instant deployment
- Collaborative editing

Your AI Code Translator will be live and shareable via the Replit URL!

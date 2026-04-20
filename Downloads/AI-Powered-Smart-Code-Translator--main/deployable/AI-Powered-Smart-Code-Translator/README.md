# AI-Powered Smart Code Translator

This project now runs as a deployable full-stack app inside `part1_initial_code`:

- `part1_initial_code/client`: React + Vite frontend
- `part1_initial_code/server`: Express API that can also serve the built frontend

## Quick Start

1. Copy `part1_initial_code/server/.env.example` to `part1_initial_code/server/.env`.
2. Copy `part1_initial_code/client/.env.example` to `part1_initial_code/client/.env` if you want custom frontend env values.
3. Install dependencies in both folders:
   - `npm install` inside `part1_initial_code/server`
   - `npm install` inside `part1_initial_code/client`
4. Start the backend with `npm run dev` in `part1_initial_code/server`.
5. Start the frontend with `npm run dev` in `part1_initial_code/client`.

## Production Build

1. Run `npm run build` in `part1_initial_code/client`.
2. Run `npm start` in `part1_initial_code/server`.
3. The server will expose the API and serve the built frontend from the same Node process.

## Notes

- If `MONGO_URI` is not set or MongoDB is unavailable, authentication falls back to in-memory local mode.
- If `GOOGLE_API_KEY` is not set or the configured Gemini model is unavailable, code-analysis endpoints return a deterministic local fallback response instead of failing.
- Do not deploy the local `.env` files that contain secrets. Use the provided `.env.example` files as templates.

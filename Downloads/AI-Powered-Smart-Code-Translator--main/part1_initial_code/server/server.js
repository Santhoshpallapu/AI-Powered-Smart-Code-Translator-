import app from './src/app.js';

const PORT = process.env.PORT || 5000;

// For Vercel, we export the app instead of listening
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

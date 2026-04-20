import authService from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username, email, and password are required',
      });
    }

    const result = await authService.register({ username, email, password });

    res.status(201).json({
      ...result,
      message:
        result.mode === 'memory'
          ? 'User registered successfully (local mode)'
          : 'User registered successfully',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      });
    }

    const result = await authService.login({ email, password });

    res.json({
      ...result,
      message:
        result.mode === 'memory'
          ? 'Login successful (local mode)'
          : 'Login successful',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

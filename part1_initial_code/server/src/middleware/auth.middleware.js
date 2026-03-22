import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate JWT tokens
 */
export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: 'Invalid or expired token'
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Authentication error'
    });
  }
};

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (!err) {
          req.user = user;
        }
      });
    }

    next();
  } catch (error) {
    next();
  }
};

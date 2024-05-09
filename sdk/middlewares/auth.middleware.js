import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    // append user object in the request
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

export { authenticateUser };

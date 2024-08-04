import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload
import User from '../models/userModel';

// Define a new interface that extends express.Request
interface AuthenticatedRequest extends Request {
  user?: any; // Define the user property
}

const jwtSecret = 'your_jwt_secret'; // Use the same secret as in authRoutes

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Type assertion to JwtPayload
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;

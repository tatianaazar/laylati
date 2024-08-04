import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// Define a new interface that extends the Express Request interface
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
    const decoded = jwt.verify(token, jwtSecret) as { user: any }; // Assuming user is present in the decoded JWT
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;

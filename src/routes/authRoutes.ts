import { Router } from 'express';
import { loginUser, registerUser, googleSignIn, facebookSignIn, appleSignIn } from '../controllers/authController';

const router = Router();

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Google Sign-In
router.post('/auth/google', googleSignIn);

// Facebook Login
router.post('/auth/facebook', facebookSignIn);

// Apple Sign-In
router.post('/auth/apple', appleSignIn);

export default router;

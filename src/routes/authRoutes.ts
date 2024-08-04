import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

const router = Router();

// Secret key for JWT
const jwtSecret = 'your_jwt_secret'; // Replace with a secure secret key in production

// Replace 'your_client_id' with your actual Google OAuth client ID
const CLIENT_ID = 'your_client_id';

// Initialize Google OAuth client
const googleClient = new OAuth2Client(CLIENT_ID);

// Route to register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, phone_number } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password, phone_number });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
          }
          if (token) {
            res.json({ token });
          } else {
            console.error('Token generation failed');
            return res.status(500).send('Server error');
          }
        });
      } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }); 

// Route for Google Sign-In
router.post('/auth/google', async (req, res) => {
  const { tokenId } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });
    const payload = ticket?.getPayload();
    const userId = payload?.sub;
    if (userId) {
      res.status(200).json({ success: true, userId });
    } else {
      res.status(400).json({ success: false, error: 'Google authentication failed' });
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).json({ success: false, error: 'Google authentication failed' });
  }
});

// Route for Facebook Login
router.post('/auth/facebook', async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await axios.get(`https://graph.facebook.com/me?fields=id,email&access_token=${accessToken}`);
    const { id, email } = response.data;
    // Create or retrieve user account based on email or id
    res.status(200).json({ success: true, userId: id });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Facebook authentication failed' });
  }
});

// Route for Apple Sign In
router.post('/auth/apple', async (req, res) => {
  const { identityToken } = req.body;
  try {
    // Decode identityToken and extract user information
    // Perform necessary validation and verification
    // Create or retrieve user account based on user information
    const userId = 'apple_user_id'; // Placeholder for Apple user ID
    res.status(200).json({ success: true, userId });
  } catch (error: any) {
    console.error(error.message);
    res.status(400).json({ success: false, error: 'Apple authentication failed' });
  }
});

export default router;

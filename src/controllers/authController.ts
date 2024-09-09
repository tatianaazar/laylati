import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your_client_id';
const googleClient = new OAuth2Client(CLIENT_ID);

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, phone_number } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, phone_number });
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      // Log incoming request
      console.log("Login attempt with email:", email);
  
      // Check if the user exists
      let user = await User.findOne({ email });
  
      if (!user) {
        // If the user doesn't exist, return specific error message
        console.log("No account associated with this email.");
        return res.status(400).json({ msg: "There's no account associated with this email." });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match result:", isMatch);
  
      if (!isMatch) {
        // If the password is incorrect, return this message
        console.log("Password incorrect for email:", email);
        return res.status(400).json({ msg: "Invalid password." });
      }
  
      // If both email and password are correct, proceed to login
      const payload = { user: { id: user.id } };
  
      jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        console.log("User logged in successfully:", email);
        res.json({ token });
      });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
  
  

// Google Sign-In
export const googleSignIn = async (req: Request, res: Response) => {
  const { tokenId } = req.body;
  
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });

    const payload = ticket?.getPayload();
    if (!payload) {
      return res.status(400).json({ msg: 'Google authentication failed' });
    }

    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        password: '', // password can be set to an empty string for OAuth accounts
        phone_number: '', // Populate as needed
      });
      await user.save();
    }

    const jwtPayload = { user: { id: user.id } };

    const token = jwt.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });
    res.json({ token, msg: 'Google Sign-In successful' });
  } catch (err: any) {
    console.error(err.message);
    res.status(400).json({ msg: 'Google authentication failed' });
  }
};

// Facebook Sign-In
export const facebookSignIn = async (req: Request, res: Response) => {
  const { accessToken } = req.body;
  
  try {
    const response = await axios.get(`https://graph.facebook.com/me?fields=id,email&access_token=${accessToken}`);
    const { id: facebookId, email, name } = response.data;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        password: '', // password can be set to an empty string for OAuth accounts
        phone_number: '', // Populate as needed
      });
      await user.save();
    }

    const jwtPayload = { user: { id: user.id } };

    const token = jwt.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });
    res.json({ token, msg: 'Facebook Sign-In successful' });
  } catch (err) {
    console.error("error");
    res.status(400).json({ msg: 'Facebook authentication failed' });
  }
};

// Apple Sign-In (placeholder logic)
export const appleSignIn = async (req: Request, res: Response) => {
  const { identityToken } = req.body;

  try {
    // Decode identityToken and extract user information
    // Perform necessary validation and verification

    // This is a placeholder; real implementation depends on your specific requirements and how you handle Apple Sign-In
    const userId = 'apple_user_id'; 

    res.status(200).json({ success: true, userId });
  } catch (err: any) {
    console.error(err.message);
    res.status(400).json({ msg: 'Apple authentication failed' });
  }
};

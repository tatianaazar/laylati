"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const axios_1 = __importDefault(require("axios"));
const google_auth_library_1 = require("google-auth-library");
const router = (0, express_1.Router)();
// Secret key for JWT
const jwtSecret = 'your_jwt_secret'; // Replace with a secure secret key in production
// Replace 'your_client_id' with your actual Google OAuth client ID
const CLIENT_ID = 'your_client_id';
// Initialize Google OAuth client
const googleClient = new google_auth_library_1.OAuth2Client(CLIENT_ID);
// Route to register a new user
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone_number } = req.body;
    try {
        let user = yield userModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new userModel_1.default({ name, email, password, phone_number });
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, salt);
        yield user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}));
// Route to login a user
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server error');
            }
            if (token) {
                res.json({ token });
            }
            else {
                console.error('Token generation failed');
                return res.status(500).send('Server error');
            }
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}));
// Route for Google Sign-In
router.post('/auth/google', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId } = req.body;
    try {
        const ticket = yield googleClient.verifyIdToken({
            idToken: tokenId,
            audience: CLIENT_ID,
        });
        const payload = ticket === null || ticket === void 0 ? void 0 : ticket.getPayload();
        const userId = payload === null || payload === void 0 ? void 0 : payload.sub;
        if (userId) {
            res.status(200).json({ success: true, userId });
        }
        else {
            res.status(400).json({ success: false, error: 'Google authentication failed' });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: 'Google authentication failed' });
    }
}));
// Route for Facebook Login
router.post('/auth/facebook', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.body;
    try {
        const response = yield axios_1.default.get(`https://graph.facebook.com/me?fields=id,email&access_token=${accessToken}`);
        const { id, email } = response.data;
        // Create or retrieve user account based on email or id
        res.status(200).json({ success: true, userId: id });
    }
    catch (error) {
        res.status(400).json({ success: false, error: 'Facebook authentication failed' });
    }
}));
// Route for Apple Sign In
router.post('/auth/apple', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identityToken } = req.body;
    try {
        // Decode identityToken and extract user information
        // Perform necessary validation and verification
        // Create or retrieve user account based on user information
        const userId = 'apple_user_id'; // Placeholder for Apple user ID
        res.status(200).json({ success: true, userId });
    }
    catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: 'Apple authentication failed' });
    }
}));
exports.default = router;

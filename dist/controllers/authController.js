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
exports.appleSignIn = exports.facebookSignIn = exports.googleSignIn = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const axios_1 = __importDefault(require("axios"));
const google_auth_library_1 = require("google-auth-library");
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your_client_id';
const googleClient = new google_auth_library_1.OAuth2Client(CLIENT_ID);
// Register User
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone_number } = req.body;
    try {
        let user = yield userModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        user = new userModel_1.default({ name, email, password: hashedPassword, phone_number });
        yield user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Log incoming request
        console.log("Login attempt with email:", email);
        // Check if the user exists
        let user = yield userModel_1.default.findOne({ email });
        if (!user) {
            // If the user doesn't exist, return specific error message
            console.log("No account associated with this email.");
            return res.status(400).json({ msg: "There's no account associated with this email." });
        }
        // Check if the password matches
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        console.log("Password match result:", isMatch);
        if (!isMatch) {
            // If the password is incorrect, return this message
            console.log("Password incorrect for email:", email);
            return res.status(400).json({ msg: "Invalid password." });
        }
        // If both email and password are correct, proceed to login
        const payload = { user: { id: user.id } };
        jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err)
                throw err;
            console.log("User logged in successfully:", email);
            res.json({ token });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
exports.loginUser = loginUser;
// Google Sign-In
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId } = req.body;
    try {
        const ticket = yield googleClient.verifyIdToken({
            idToken: tokenId,
            audience: CLIENT_ID,
        });
        const payload = ticket === null || ticket === void 0 ? void 0 : ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ msg: 'Google authentication failed' });
        }
        const { sub: googleId, email, name } = payload;
        let user = yield userModel_1.default.findOne({ email });
        if (!user) {
            user = new userModel_1.default({
                name,
                email,
                password: '', // password can be set to an empty string for OAuth accounts
                phone_number: '', // Populate as needed
            });
            yield user.save();
        }
        const jwtPayload = { user: { id: user.id } };
        const token = jsonwebtoken_1.default.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });
        res.json({ token, msg: 'Google Sign-In successful' });
    }
    catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: 'Google authentication failed' });
    }
});
exports.googleSignIn = googleSignIn;
// Facebook Sign-In
const facebookSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.body;
    try {
        const response = yield axios_1.default.get(`https://graph.facebook.com/me?fields=id,email&access_token=${accessToken}`);
        const { id: facebookId, email, name } = response.data;
        let user = yield userModel_1.default.findOne({ email });
        if (!user) {
            user = new userModel_1.default({
                name,
                email,
                password: '', // password can be set to an empty string for OAuth accounts
                phone_number: '', // Populate as needed
            });
            yield user.save();
        }
        const jwtPayload = { user: { id: user.id } };
        const token = jsonwebtoken_1.default.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });
        res.json({ token, msg: 'Facebook Sign-In successful' });
    }
    catch (err) {
        console.error("error");
        res.status(400).json({ msg: 'Facebook authentication failed' });
    }
});
exports.facebookSignIn = facebookSignIn;
// Apple Sign-In (placeholder logic)
const appleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identityToken } = req.body;
    try {
        // Decode identityToken and extract user information
        // Perform necessary validation and verification
        // This is a placeholder; real implementation depends on your specific requirements and how you handle Apple Sign-In
        const userId = 'apple_user_id';
        res.status(200).json({ success: true, userId });
    }
    catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: 'Apple authentication failed' });
    }
});
exports.appleSignIn = appleSignIn;

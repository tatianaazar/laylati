"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// User Registration
router.post('/register', authController_1.registerUser);
// User Login
router.post('/login', authController_1.loginUser);
// Google Sign-In
router.post('/auth/google', authController_1.googleSignIn);
// Facebook Login
router.post('/auth/facebook', authController_1.facebookSignIn);
// Apple Sign-In
router.post('/auth/apple', authController_1.appleSignIn);
exports.default = router;

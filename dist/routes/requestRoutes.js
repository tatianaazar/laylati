"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// /routes/requestRoutes.ts
const express_1 = require("express");
const requestController_1 = require("../controllers/requestController");
const router = (0, express_1.Router)();
// Define the POST route for service requests
router.post('/requests', requestController_1.createRequest);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware")); // Import your existing auth middleware
const router = express_1.default.Router();
// Route to get specific user's events
router.get('/', authMiddleware_1.default, eventController_1.getEvents);
// Protect routes using authMiddleware
router.post('/create', authMiddleware_1.default, eventController_1.createEvent); // Create a new event
router.delete('/:id', authMiddleware_1.default, eventController_1.deleteEvent);
router.put('/:id', authMiddleware_1.default, eventController_1.updateEvent);
router.post('/book', authMiddleware_1.default, eventController_1.bookVendor); // Book a vendor for an event
router.get('/', authMiddleware_1.default, eventController_1.getEventDetails); // Get all events for a user
router.post('/update-status', authMiddleware_1.default, eventController_1.updateVendorStatus); // Update vendor status for an event
exports.default = router;

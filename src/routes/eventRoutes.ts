import express from 'express';
import { createEvent, deleteEvent, updateEvent, getEventDetails, bookVendor, updateVendorStatus, getEvents } from '../controllers/eventController';
import authMiddleware from '../middleware/authMiddleware'; // Import your existing auth middleware

const router = express.Router();

// Route to get specific user's events
router.get('/', authMiddleware, getEvents);

// Protect routes using authMiddleware
router.post('/create', authMiddleware, createEvent);         // Create a new event

router.delete('/:id', authMiddleware, deleteEvent);

router.put('/:id', authMiddleware, updateEvent);

router.post('/book', authMiddleware, bookVendor);            // Book a vendor for an event

router.get('/', authMiddleware, getEventDetails);                  // Get all events for a user

router.post('/update-status', authMiddleware, updateVendorStatus); // Update vendor status for an event

export default router;

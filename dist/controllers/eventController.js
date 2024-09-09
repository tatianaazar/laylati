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
exports.updateVendorStatus = exports.getEventDetails = exports.bookVendor = exports.updateEvent = exports.deleteEvent = exports.createEvent = exports.getEvents = void 0;
const eventModel_1 = __importDefault(require("../models/eventModel")); // Import Event model
// Get all events for the logged-in user
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if req.user is defined
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized, user not found' });
        }
        const events = yield eventModel_1.default.find({ user: req.user.id });
        if (!events || events.length === 0) {
            return res.status(404).json({ msg: 'No events found' });
        }
        res.json(events);
    }
    catch (error) {
        console.error("Error: could not fetch events", error);
        res.status(500).send('Server error');
    }
});
exports.getEvents = getEvents;
// Create a new event
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, date, location } = req.body;
    try {
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        const newEvent = new eventModel_1.default({
            user: req.user.id, // Ensure the user ID is set
            name,
            category,
            date,
            location,
            vendors: [], // Start with no vendors assigned
        });
        const event = yield newEvent.save();
        res.json(event);
    }
    catch (error) {
        console.error("Error creating new event.", error);
        res.status(500).send('Server error');
    }
});
exports.createEvent = createEvent;
// Delete an event
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const event = yield eventModel_1.default.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        // Make sure the event belongs to the logged-in user
        if (event.user.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        yield event.deleteOne(); // Use deleteOne instead of remove
        res.json({ msg: 'Event deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send('Server error');
    }
});
exports.deleteEvent = deleteEvent;
// Update event
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, date, location } = req.body;
    const { id } = req.params; // Ensure the event ID is retrieved from the URL
    try {
        const event = yield eventModel_1.default.findById(id); // Find event by ID
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        // Update event details
        event.name = name || event.name;
        event.category = category || event.category;
        event.date = date || event.date;
        event.location = location || event.location;
        yield event.save();
        res.json(event);
    }
    catch (error) {
        console.error('Error updating event:', error);
        res.status(500).send('Server error');
    }
});
exports.updateEvent = updateEvent;
// Book a vendor for an event
const bookVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId, vendorId } = req.body;
    try {
        // Find the event
        const event = yield eventModel_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        // Check if the vendor is already booked
        const vendorExists = event.vendors.find(vendor => { var _a; return ((_a = vendor.vendorId) === null || _a === void 0 ? void 0 : _a.toString()) === vendorId; });
        if (vendorExists) {
            return res.status(400).json({ msg: 'Vendor already booked for this event' });
        }
        // Add the vendor to the event with 'pending' status
        event.vendors.push({ vendorId, status: 'pending' });
        yield event.save();
        res.json(event);
    }
    catch (error) {
        console.error("Error: could not book vendor", error);
        res.status(500).send('Server error');
    }
});
exports.bookVendor = bookVendor;
// Get event details including vendors
const getEventDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield eventModel_1.default.findById(req.params.id).populate('vendors.vendorId');
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(event);
    }
    catch (error) {
        console.error("Error: could not fetch vendor details", error);
        res.status(500).send('Server error');
    }
});
exports.getEventDetails = getEventDetails;
// Vendor status updates (e.g., when a vendor confirms their booking)
const updateVendorStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId, vendorId, status } = req.body;
    try {
        const event = yield eventModel_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        const vendor = event.vendors.find(v => { var _a; return ((_a = v.vendorId) === null || _a === void 0 ? void 0 : _a.toString()) === vendorId; });
        if (!vendor) {
            return res.status(404).json({ msg: 'Vendor not found in this event' });
        }
        // Update vendor status
        vendor.status = status;
        yield event.save();
        res.json({ msg: `Vendor status updated to ${status}` });
    }
    catch (error) {
        console.error("Error: could not update vendor status", error);
        res.status(500).send('Server error');
    }
});
exports.updateVendorStatus = updateVendorStatus;

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
exports.createRequest = void 0;
const requestModel_1 = __importDefault(require("../models/requestModel"));
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId, vendors } = req.body; // Use "vendors" instead of "cartItems"
    // Validate incoming data
    if (!eventId || !vendors || vendors.length === 0) {
        return res.status(400).json({ msg: 'Event and vendors are required.' });
    }
    try {
        // Create a new request model with eventId and vendor services
        const newRequest = new requestModel_1.default({
            eventId,
            services: vendors.map((item) => ({
                vendorId: item.vendorId, // Use vendorId as passed in the payload
                package: item.packageName, // Use packageName as passed in the payload
            })),
        });
        // Save the request in the database
        yield newRequest.save();
        // Return success response with the saved request
        return res.status(200).json({ msg: 'Services requested successfully', request: newRequest });
    }
    catch (error) {
        console.error('Error while creating request:', error);
        return res.status(500).json({ msg: 'Server error', error: 'Error while saving request' });
    }
});
exports.createRequest = createRequest;

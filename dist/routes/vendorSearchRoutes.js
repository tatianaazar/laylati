"use strict";
// src/routes/vendorSearchRoutes.ts
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
const vendorModel_1 = __importDefault(require("../models/vendorModel")); // Assuming this is your vendor model
const searchRouter = (0, express_1.Router)();
// Route for searching vendors
searchRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET /vendors/search - Query params:', req.query); // Log query params
    try {
        const searchQuery = req.query.searchQuery ? String(req.query.searchQuery) : '';
        if (!searchQuery) {
            return res.status(400).json({ message: 'searchQuery parameter is required' });
        }
        console.log(`Searching for vendors with query: ${searchQuery}`);
        const regex = new RegExp(searchQuery, 'i'); // Case-insensitive regex
        const vendors = yield vendorModel_1.default.find({
            $or: [
                { name: regex },
                { category: regex },
                { description: regex },
            ],
        });
        if (vendors.length === 0) {
            return res.status(404).json({ message: `No vendors found for query: ${searchQuery}` });
        }
        res.status(200).json(vendors);
    }
    catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ message: 'Error fetching vendors', error });
    }
}));
exports.default = searchRouter;

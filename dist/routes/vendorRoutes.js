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
const vendorModel_1 = __importDefault(require("../models/vendorModel")); // Assuming this is your vendor model
const router = (0, express_1.Router)();
// Route for search query
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET /vendors - Query params:', req.query); // This should print
    try {
        const searchQuery = req.query.searchQuery ? String(req.query.searchQuery) : '';
        let vendors;
        if (searchQuery) {
            console.log(`Searching for vendors with query: ${searchQuery}`);
            const searchRegex = new RegExp(searchQuery, 'i'); // 'i' for case-insensitive search
            vendors = yield vendorModel_1.default.find({
                $or: [
                    { name: searchRegex },
                    { category: searchRegex },
                    { description: searchRegex },
                ]
            });
        }
        else {
            vendors = yield vendorModel_1.default.find();
        }
        res.status(200).json(vendors);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching vendors', error });
    }
}));
// Route for fetching vendors by category
router.get('/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Incoming category request: ${req.params.category}`);
    const category = req.params.category;
    try {
        const vendors = yield vendorModel_1.default.find({ category });
        if (!vendors.length) {
            return res.status(404).json({ message: `No vendors found for category ${category}` });
        }
        res.status(200).json(vendors);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching vendors', error });
    }
}));
exports.default = router;

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
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const router = (0, express_1.Router)();
router.get('/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    console.log(`Incoming category request: ${category}`);
    try {
        const vendors = yield vendorModel_1.default.find({ category });
        if (!vendors.length) {
            console.log(`No vendors found for category: ${category}`);
            return res.status(404).json({ message: `No vendors found for category ${category}` });
        }
        res.status(200).json(vendors); // Send the response, including the image URLs
    }
    catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}));
exports.default = router;

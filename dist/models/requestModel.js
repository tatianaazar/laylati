"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// /models/Request.ts
const mongoose_1 = require("mongoose");
const RequestSchema = new mongoose_1.Schema({
    eventId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    services: [
        {
            vendorId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Vendor',
                required: true,
            },
            package: {
                type: String,
                required: true,
            },
        },
    ],
    requestedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = (0, mongoose_1.model)('Request', RequestSchema);

"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const vendorRoutes_1 = __importDefault(require("./routes/vendorRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const requestRoutes_1 = __importDefault(require("./routes/requestRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
//app.use(cors());
app.use((0, cors_1.default)({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
(0, database_1.default)();
app.use('/api/vendors', vendorRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/events', eventRoutes_1.default);
app.use('/api', requestRoutes_1.default);
app.get('/', (req, res) => res.send('Server is running!'));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

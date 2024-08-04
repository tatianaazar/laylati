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
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const mongoose_1 = __importDefault(require("mongoose"));
const vendorModel_1 = __importDefault(require("../models/vendorModel")); // Ensure this path is correct
// Replace these values with your own Google Sheets credentials
const CLIENT_ID = '978892766740-3rkkh7hbcd7hkfljvbah9265vgtp2n9t.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';
// Google Sheets API credentials
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// Initialize OAuth2 client
const oAuth2Client = new google_auth_library_1.OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// Connect to MongoDB
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('mongodb+srv://tatianaazar:Juliette02%21@laylatidb.s7gnwt5.mongodb.net/?retryWrites=true&w=majority&appName=LaylatiDB');
            console.log('Connected to MongoDB');
            yield fetchDataFromGoogleSheets();
        }
        catch (error) {
            console.error('Failed to connect to MongoDB:', error);
        }
    });
}
// Fetch data from Google Sheets
function fetchDataFromGoogleSheets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sheets = googleapis_1.google.sheets({ version: 'v4', auth: oAuth2Client });
            const response = yield sheets.spreadsheets.values.get({
                spreadsheetId: 'YOUR_SPREADSHEET_ID',
                range: 'Sheet1!A:G', // Adjust range to match the columns in your spreadsheet
            });
            const rows = response.data.values;
            if (rows && rows.length) {
                yield syncDataWithMongoDB(rows);
            }
            else {
                console.log('No data found.');
            }
        }
        catch (error) {
            console.error('Error fetching data from Google Sheets:', error);
        }
    });
}
// Sync data with MongoDB
function syncDataWithMongoDB(rows) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Clear existing data in MongoDB (optional, depends on your requirements)
            yield vendorModel_1.default.deleteMany({});
            // Iterate through rows and save data to MongoDB
            for (const row of rows) {
                const [name, vendorType, rating, description, logo, experience, website_link] = row;
                yield vendorModel_1.default.create({ name, vendorType, rating, description, logo, experience, website_link });
            }
            console.log('Data synced with MongoDB successfully.');
        }
        catch (error) {
            console.error('Error syncing data with MongoDB:', error);
        }
    });
}
// Call the functions to start the synchronization process
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
}))();

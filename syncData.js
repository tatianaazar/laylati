// syncData.js

import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';
import Vendor from './models/vendorModel';

// Replace these values with your own Google Sheets credentials
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

// Google Sheets API credentials
const SCOPES = ['https://docs.google.com/spreadsheets/d/1PvXCQzy45YMmVNwpdjXr9nD3ib8ibtP4NNZ5jIkuZR0/edit?usp=sharing'];
const TOKEN_PATH = 'token.json';

// Initialize OAuth2 client
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/your_database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connected to MongoDB');
    await fetchDataFromGoogleSheets();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

// Fetch data from Google Sheets
async function fetchDataFromGoogleSheets() {
  try {
    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: 'YOUR_SPREADSHEET_ID',
      range: 'Sheet1' // Change this to the actual range of your data
    });
    const rows = response.data.values;
    if (rows.length) {
      await syncDataWithMongoDB(rows);
    } else {
      console.log('No data found.');
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
  }
}

// Sync data with MongoDB
async function syncDataWithMongoDB(rows) {
  try {
    // Clear existing data in MongoDB (optional, depends on your requirements)
    await Vendor.deleteMany({});
    
    // Iterate through rows and save data to MongoDB
    for (const row of rows) {
      const [name, vendorType, rating, description, logo, experience, website_link] = row;
      await Vendor.create({ name, vendorType, rating, description, logo, experience, website_link });
    }
    console.log('Data synced with MongoDB successfully.');
  } catch (error) {
    console.error('Error syncing data with MongoDB:', error);
  }
}

// Call the functions to start the synchronization process
(async () => {
  await connectToDatabase();
})();

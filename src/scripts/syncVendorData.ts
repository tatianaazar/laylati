


  import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';
import Vendor from '../models/vendorModel'; // Ensure this path is correct

// Replace these values with your own Google Sheets credentials
const CLIENT_ID = '978892766740-3rkkh7hbcd7hkfljvbah9265vgtp2n9t.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

// Google Sheets API credentials
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Initialize OAuth2 client
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://tatianaazar:Juliette02%21@laylatidb.s7gnwt5.mongodb.net/?retryWrites=true&w=majority&appName=LaylatiDB');
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
      range: 'Sheet1!A:G', // Adjust range to match the columns in your spreadsheet
    });
    const rows = response.data.values;
    if (rows && rows.length) {
      await syncDataWithMongoDB(rows);
    } else {
      console.log('No data found.');
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
  }
}

// Sync data with MongoDB
async function syncDataWithMongoDB(rows: string[][]) {
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



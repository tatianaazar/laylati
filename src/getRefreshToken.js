const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Load client secrets from a local file
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Generate an OAuth URL and open it in the browser
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting this url:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', (code) => {
  rl.close();

  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    oAuth2Client.setCredentials(token);
    console.log('Token stored to', TOKEN_PATH);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
    console.log('Access Token:', token.access_token);
    console.log('Refresh Token:', token.refresh_token);
  });
});

// src/index.ts

import express from 'express';
import connectDB from './database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import vendorRoutes from './routes/vendorRoutes';
import eventRoutes from './routes/eventRoutes';
import User from './models/userModel';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';


const app = express();
const PORT = process.env.PORT || 5000;

//app.use(cors());

app.use(cors({
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

app.use(bodyParser.json());

connectDB();

app.use('/api/vendors', vendorRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/events', eventRoutes);

app.get('/', (req, res) => res.send('Server is running!'));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

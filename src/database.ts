// src/database.ts

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tatianaazar:Juliette02%21@laylatidb.s7gnwt5.mongodb.net/?retryWrites=true&w=majority&appName=LaylatiDB');
  
    console.log('MongoDB connected');
  } catch (err: unknown) {
    if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error('An unknown error occured.');
  }
    process.exit(1);
  }
};

export default connectDB;

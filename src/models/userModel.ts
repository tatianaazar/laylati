// src/models/userModel.ts

import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone_number: string
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },

}, { collection: 'Users' });

const User = mongoose.model<IUser>('User', UserSchema);
export default User;

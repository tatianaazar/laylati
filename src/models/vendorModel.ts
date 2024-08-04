// src/models/Vendor.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IVendor extends Document {
  name: string;
  category: string;
  description: string;
  details: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
}

const VendorSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true }, 
  details: {
    address: String,
    phone: String,
    email: String,
    website: String,
    image: String, 
  },
});



const Vendor = mongoose.model<IVendor>('Vendor', VendorSchema);
export default Vendor;


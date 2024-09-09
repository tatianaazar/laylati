import mongoose, { Schema } from 'mongoose';

// Define the Event schema
const EventSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  vendors: [
    {
      vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
      },
      status: {
        type: String,
        enum: ['pending', 'confirmed', 'declined'],
        default: 'pending',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Event', EventSchema);

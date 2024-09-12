// /models/Request.ts
import { Schema, model, Document } from 'mongoose';

interface IService {
  vendorId: Schema.Types.ObjectId;
  package: string;
}

interface IRequest extends Document {
  eventId: Schema.Types.ObjectId;
  services: IService[];
  requestedAt: Date;
}

const RequestSchema = new Schema<IRequest>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  services: [
    {
      vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
      },
      package: {
        type: String,
        required: true,
      },
    },
  ],
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<IRequest>('Request', RequestSchema);

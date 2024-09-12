// /controllers/requestsController.ts
import { Request, Response } from 'express';
import RequestModel from '../models/requestModel';

export const createRequest = async (req: Request, res: Response): Promise<Response> => {
  const { eventId, vendors } = req.body;  // Use "vendors" instead of "cartItems"

  // Validate incoming data
  if (!eventId || !vendors || vendors.length === 0) {
    return res.status(400).json({ msg: 'Event and vendors are required.' });
  }

  try {
    // Create a new request model with eventId and vendor services
    const newRequest = new RequestModel({
      eventId,
      services: vendors.map((item: any) => ({
        vendorId: item.vendorId,  // Use vendorId as passed in the payload
        package: item.packageName,  // Use packageName as passed in the payload
      })),
    });

    // Save the request in the database
    await newRequest.save();

    // Return success response with the saved request
    return res.status(200).json({ msg: 'Services requested successfully', request: newRequest });
  } catch (error) {
    console.error('Error while creating request:', error);
    return res.status(500).json({ msg: 'Server error', error: 'Error while saving request' });
  }
};

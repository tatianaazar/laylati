import { Request, Response } from 'express';
import Event from '../models/eventModel';  // Import Event model
import Vendor from '../models/vendorModel'; // Import Vendor model

interface AuthenticatedRequest extends Request {
  user?: { id: string }; // Add the optional user property
}

// Get all events for the logged-in user
export const getEvents = async (req: AuthenticatedRequest, res: Response) => {
    try {
      // Check if req.user is defined
      if (!req.user) {
        return res.status(401).json({ msg: 'Unauthorized, user not found' });
      }
  
      const events = await Event.find({ user: req.user.id });
      if (!events || events.length === 0) {
        return res.status(404).json({ msg: 'No events found' });
      }
  
      res.json(events);
    } catch (error) {
      console.error("Error: could not fetch events", error);
      res.status(500).send('Server error');
    }
  };
  

// Create a new event
export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
  const { name, category, date, location } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const newEvent = new Event({
      user: req.user.id, // Ensure the user ID is set
      name,
      category,
      date,
      location,
      vendors: [], // Start with no vendors assigned
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (error) {
    console.error("Error creating new event.", error);
    res.status(500).send('Server error');
  }
};

// Delete an event
export const deleteEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const event = await Event.findById(req.params.id);
  
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
  
      // Make sure the event belongs to the logged-in user
      if (event.user.toString() !== req.user?.id) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }
  
      await event.deleteOne(); // Use deleteOne instead of remove
      res.json({ msg: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).send('Server error');
    }
  };
  
  
  

// Update event
export const updateEvent = async (req: AuthenticatedRequest, res: Response) => {
    const { name, category, date, location } = req.body;
    const { id } = req.params; // Ensure the event ID is retrieved from the URL

    try {
        const event = await Event.findById(id); // Find event by ID
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Update event details
        event.name = name || event.name;
        event.category = category || event.category;
        event.date = date || event.date;
        event.location = location || event.location;

        await event.save();
        res.json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).send('Server error');
    }
};

  
  

// Book a vendor for an event
export const bookVendor = async (req: AuthenticatedRequest, res: Response) => {
  const { eventId, vendorId } = req.body;

  try {
    // Find the event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the vendor is already booked
    const vendorExists = event.vendors.find(vendor => vendor.vendorId?.toString() === vendorId);

    if (vendorExists) {
      return res.status(400).json({ msg: 'Vendor already booked for this event' });
    }

    // Add the vendor to the event with 'pending' status
    event.vendors.push({ vendorId, status: 'pending' });

    await event.save();
    res.json(event);
  } catch (error) {
    console.error("Error: could not book vendor", error);
    res.status(500).send('Server error');
  }
};

// Get event details including vendors
export const getEventDetails = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id).populate('vendors.vendorId');
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error("Error: could not fetch vendor details", error);
    res.status(500).send('Server error');
  }
};

// Vendor status updates (e.g., when a vendor confirms their booking)
export const updateVendorStatus = async (req: AuthenticatedRequest, res: Response) => {
  const { eventId, vendorId, status } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    const vendor = event.vendors.find(v => v.vendorId?.toString() === vendorId);

    if (!vendor) {
      return res.status(404).json({ msg: 'Vendor not found in this event' });
    }

    // Update vendor status
    vendor.status = status;

    await event.save();
    res.json({ msg: `Vendor status updated to ${status}` });
  } catch (error) {
    console.error("Error: could not update vendor status", error);
    res.status(500).send('Server error');
  }
};



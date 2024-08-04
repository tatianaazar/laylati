import { Router } from 'express';
import Vendor from '../models/vendorModel';

const router = Router();

router.get('/:category', async (req, res) => {
  const category = req.params.category;
  console.log(`Incoming category request: ${category}`);

  try {
    const vendors = await Vendor.find({ category });
    if (!vendors.length) {
      console.log(`No vendors found for category: ${category}`);
      return res.status(404).json({ message: `No vendors found for category ${category}` });
    }
    res.status(200).json(vendors); // Send the response, including the image URLs
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});


export default router;

import { Router } from 'express';
import Vendor from '../models/vendorModel';  // Assuming this is your vendor model

const router = Router();

// Route for search query
router.get('/', async (req, res) => {
  console.log('GET /vendors - Query params:', req.query);  // This should print

  try {
    const searchQuery = req.query.searchQuery ? String(req.query.searchQuery) : '';

    let vendors;

    if (searchQuery) {
      console.log(`Searching for vendors with query: ${searchQuery}`);
      const searchRegex = new RegExp(searchQuery, 'i');  // 'i' for case-insensitive search

      vendors = await Vendor.find({
        $or: [
          { name: searchRegex },
          { category: searchRegex },
          { description: searchRegex },
        ]
      });
    } else {
      vendors = await Vendor.find();
    }

    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vendors', error });
  }
});

// Route for fetching vendors by category
router.get('/:category', async (req, res) => {
  console.log(`Incoming category request: ${req.params.category}`);

  const category = req.params.category;

  try {
    const vendors = await Vendor.find({ category });

    if (!vendors.length) {
      return res.status(404).json({ message: `No vendors found for category ${category}` });
    }

    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vendors', error });
  }
});

export default router;

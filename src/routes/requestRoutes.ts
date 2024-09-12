// /routes/requestRoutes.ts
import { Router } from 'express';
import { createRequest } from '../controllers/requestController';

const router = Router();

// Define the POST route for service requests
router.post('/requests', createRequest);

export default router;

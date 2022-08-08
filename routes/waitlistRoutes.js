// routes for the waitlist
import express from 'express';
const router = express.Router();

import { getWaitlistEntry, createWaitlistEntry, setWailistClaimed } from '../controllers/waitlistController.js';

// send token by query
router.get('/', getWaitlistEntry);

router.post('/register', createWaitlistEntry);

// send token by query
router.post('/claim', setWailistClaimed);

export default router;

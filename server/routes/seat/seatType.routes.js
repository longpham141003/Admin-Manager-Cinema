import express from 'express';
import { createSeatTypes, getAllSeatTypes, deleteAllSeatTypes } from '../../controllers/seat/seatType.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, authorize('admin'), createSeatTypes);
router.get('/', auth, authorize('admin'), getAllSeatTypes);
router.delete('/', auth, authorize('admin'), deleteAllSeatTypes);

export default router;

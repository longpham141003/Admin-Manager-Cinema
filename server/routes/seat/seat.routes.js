import express from 'express';
import { createSeats, updateSeatStatus, getAllSeats, getSeatById, deleteAllSeats } from '../../controllers/seat/seat.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/create', auth, authorize('admin'), createSeats);
router.put('/:seatId', auth, authorize('admin'), updateSeatStatus);
router.get('/', auth, getAllSeats);
router.get('/:seatId', auth, getSeatById);
router.delete('/deleteAll', auth, authorize('admin'), deleteAllSeats);

export default router;

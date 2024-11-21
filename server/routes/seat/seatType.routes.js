import express from 'express';
import { createSeatTypes, getAllSeatTypes, deleteAllSeatTypes } from '../../controllers/seat/seatType.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';

const router = express.Router();

// Route để tạo loại ghế
router.post('/', auth, authorize('admin'), createSeatTypes);

// Route để lấy tất cả loại ghế
router.get('/', auth, authorize('admin'), getAllSeatTypes);

// Route để xóa tất cả loại ghế
router.delete('/', auth, authorize('admin'), deleteAllSeatTypes);

export default router;

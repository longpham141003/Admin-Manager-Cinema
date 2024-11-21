import express from 'express';
import { createSeats, updateSeatStatus, getAllSeats, getSeatById, deleteAllSeats } from '../../controllers/seat/seat.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';

const router = express.Router();

// Route để tạo ghế
router.post('/create', auth, authorize('admin'), createSeats);

// Route để cập nhật trạng thái ghế
router.put('/:seatId', auth, authorize('admin'), updateSeatStatus);

// Route để lấy tất cả ghế
router.get('/', auth, getAllSeats);

// Route để lấy thông tin chi tiết của một ghế
router.get('/:seatId', auth, getSeatById);

// Route để xóa tất cả ghế
router.delete('/deleteAll', auth, authorize('admin'), deleteAllSeats);

export default router;

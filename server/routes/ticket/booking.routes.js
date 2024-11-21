import express from 'express';
import { auth, authorize } from '../../middlewares/auth.js';
import * as bookingController from '../../controllers/ticket/booking.controller.js'; // Đổi tên đường dẫn

const router = express.Router();

// Tạo đặt chỗ mới
router.post('/', auth, bookingController.createBooking);

// Lấy tất cả đặt chỗ
router.get('/', auth, bookingController.getAllBookingsWithDetails); // Sửa ở đây

// Lấy đặt chỗ theo ID
router.get('/:id', auth, bookingController.getBookingById); // Đổi thành getBookingById

// Cập nhật trạng thái đặt chỗ
router.put('/:id', auth, bookingController.updateBookingStatus);

// Xóa đặt chỗ
router.delete('/:id', auth, bookingController.deleteBooking);

// Route để xóa tất cả đặt chỗ
router.delete('/', auth, authorize(['admin']), bookingController.deleteAllBookings);

export default router;

import express from 'express';
import { auth, authorize } from '../../middlewares/auth.js';
import * as bookingController from '../../controllers/ticket/booking.controller.js';

const router = express.Router();

router.post('/', auth, bookingController.createBooking);
router.get('/', auth, bookingController.getAllBookingsWithDetails);
router.get('/:id', auth, bookingController.getBookingById);
router.put('/:id', auth, bookingController.updateBookingStatus);
router.delete('/:id', auth, bookingController.deleteBooking);
router.delete('/', auth, authorize(['admin']), bookingController.deleteAllBookings);

export default router;

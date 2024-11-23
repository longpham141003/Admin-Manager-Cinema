import express from 'express';
import { getShowtimesByTheater, getShowtimesByMovie, addShowtime, updateShowtime, deleteShowtime, deleteAllShowtimes } from '../../controllers/showtime/showtime.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';

const router = express.Router();
//tại sao không cần auth?
router.get('/theaters/:id/showtimes', getShowtimesByTheater);
router.get('/movies/:id/showtimes', getShowtimesByMovie);
router.post('/', auth, authorize('admin'), addShowtime);
router.put('/:id', auth, authorize('admin'), updateShowtime);
router.delete('/all', auth, authorize('admin'), deleteAllShowtimes);
router.delete('/:id', auth, authorize('admin'), deleteShowtime);

export default router;

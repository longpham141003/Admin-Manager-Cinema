import express from 'express';
import { 
  getShowtimesByTheater, 
  getShowtimesByMovie, 
  addShowtime, 
  updateShowtime, 
  deleteShowtime, 
  deleteAllShowtimes 
} from '../../controllers/showtime/showtime.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';  
import { createShowtimeSchema, updateShowtimeSchema } from '../../validations/showtimeValidation.js';  

const router = express.Router();

router.get('/theaters/:id/showtimes', getShowtimesByTheater);
router.get('/movies/:id/showtimes', getShowtimesByMovie);
router.post('/', auth, authorize('admin'), validate(createShowtimeSchema), addShowtime);
router.put('/:id', auth, authorize('admin'), validate(updateShowtimeSchema), updateShowtime);
router.delete('/all', auth, authorize('admin'), deleteAllShowtimes);
router.delete('/:id', auth, authorize('admin'), deleteShowtime);

export default router;

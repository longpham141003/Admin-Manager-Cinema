import express from 'express';
import { 
    createSeats, 
    updateSeatStatus, 
    getAllSeats, 
    getSeatById, 
    deleteAllSeats 
} from '../../controllers/seat/seat.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';  
import { createSeatSchema, updateSeatSchema } from '../../validations/seatValidation.js';  

const router = express.Router();

router.post('/create', auth, authorize('admin'), validate(createSeatSchema), createSeats);
router.put('/:seatId', auth, authorize('admin'), validate(updateSeatSchema), updateSeatStatus);
router.get('/', auth, getAllSeats);
router.get('/:seatId', auth, getSeatById);
router.delete('/deleteAll', auth, authorize('admin'), deleteAllSeats);

export default router;

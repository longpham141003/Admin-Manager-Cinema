import express from 'express';
import { 
  getTheaters, 
  getTheaterById, 
  addTheater, 
  updateTheater, 
  deleteTheater, 
  deleteAllTheaters 
} from '../../controllers/theater/theater.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';  
import { createTheaterSchema, updateTheaterSchema } from '../../validations/theaterValidation.js';  
const router = express.Router();

router.post('/', auth, authorize('admin'), validate(createTheaterSchema), addTheater);
router.put('/:id', auth, authorize('admin'), validate(updateTheaterSchema), updateTheater);
router.delete('/all', auth, authorize('admin'), deleteAllTheaters); 
router.get('/', getTheaters);
router.get('/:id', getTheaterById);
router.delete('/:id', auth, authorize('admin'), deleteTheater);
router.delete('/all', auth, authorize('admin'), deleteAllTheaters);

export default router;

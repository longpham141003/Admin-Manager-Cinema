import express from 'express';
import { getTheaters, getTheaterById, addTheater, updateTheater, deleteTheater, deleteAllTheaters } from '../../controllers/theater/theater.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';

const router = express.Router();

router.delete('/all', auth, authorize('admin'), deleteAllTheaters); 
router.get('/', getTheaters);
router.get('/:id', getTheaterById);
router.post('/', auth, authorize('admin'), addTheater);
router.put('/:id', auth, authorize('admin'), updateTheater);
router.delete('/:id', auth, authorize('admin'), deleteTheater);

export default router;

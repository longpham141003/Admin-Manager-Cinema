import express from 'express';
import { getAllSnacks, getSnackById, addSnack, updateSnack, deleteSnack } from '../../controllers/snack/snack.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';
import upload from '../../middlewares/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), addSnack);
router.get('/', getAllSnacks);
router.get('/:id', getSnackById);
router.post('/', auth, authorize('admin'), addSnack);
router.put('/:id', upload.single('image'), auth, authorize('admin'), updateSnack);
router.delete('/:id', auth, authorize('admin'), deleteSnack);

export default router;

import express from 'express';
import { getAllSnacks, getSnackById, addSnack, updateSnack, deleteSnack } from '../../controllers/snack/snack.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';
import upload from '../../middlewares/upload.js'; // import middleware multer

const router = express.Router();

// Route thêm mới snack (có upload ảnh)
router.post('/', upload.single('image'), addSnack); // upload.single('image') để xử lý file upload

// Routes cho snack
router.get('/', getAllSnacks); // Lấy danh sách snack
router.get('/:id', getSnackById); // Lấy chi tiết snack

// Routes cho admin
router.post('/', auth, authorize('admin'), addSnack); // Thêm snack
router.put('/:id', upload.single('image'), auth, authorize('admin'), updateSnack);
router.delete('/:id', auth, authorize('admin'), deleteSnack); // Xóa snack

export default router;

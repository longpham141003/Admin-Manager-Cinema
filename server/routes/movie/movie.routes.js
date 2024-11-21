import express from 'express';
import { 
    getAllMovies, 
    getMovieById, 
    getShowtimesByMovieId, 
    addMovie, 
    updateMovie, 
    deleteMovie,
    getAllMoviesAdmin,
    deleteAllMovies 
} from '../../controllers/movie/movie.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';
import upload from '../../middlewares/upload.js';

const router = express.Router();

router.post('/', auth, authorize('admin'), upload.fields([
    { name: 'image', maxCount: 1 },  
    { name: 'poster', maxCount: 1 }, 
    { name: 'trailer', maxCount: 1 }
]), addMovie);

router.put('/:id', auth, authorize('admin'), upload.fields([
    { name: 'image', maxCount: 1 },  
    { name: 'poster', maxCount: 1 }, 
    { name: 'trailer', maxCount: 1 }
]), updateMovie);

router.get('/', getAllMovies); // Lấy danh sách phim
router.get('/:id', getMovieById); // Lấy chi tiết phim
router.get('/:id/showtimes', getShowtimesByMovieId); // Lấy danh sách lịch chiếu
router.delete('/delete-all', auth, authorize('admin'), deleteAllMovies); // Admin xóa tất cả các phim
router.delete('/:id', auth, authorize('admin'), deleteMovie); // Xóa phim (admin)
router.get('/all', auth, authorize('admin'), getAllMoviesAdmin); // Admin lấy tất cả các phim

export default router;

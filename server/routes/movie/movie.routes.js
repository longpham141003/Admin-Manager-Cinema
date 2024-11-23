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

//tại sao không cần auth?
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.get('/:id/showtimes', getShowtimesByMovieId);
router.delete('/delete-all', auth, authorize('admin'), deleteAllMovies);
router.delete('/:id', auth, authorize('admin'), deleteMovie);
router.get('/all', auth, authorize('admin'), getAllMoviesAdmin);

export default router;

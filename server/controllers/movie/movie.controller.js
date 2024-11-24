import Movie from '../../models/movie/movie.model.js';

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find(); 
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        if (movie.poster) {
            movie.poster = `${req.protocol}://${req.get('host')}/api/uploads/${movie.poster}`;
        }
        if (movie.image) {
            movie.image = `${req.protocol}://${req.get('host')}/api/uploads/${movie.image}`;
        }
        if (movie.trailer) {
            movie.trailer = `${req.protocol}://${req.get('host')}/api/uploads/${movie.trailer}`;
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error('Error while fetching movie details:', error);
        res.status(500).json({ error: error.message });
    }
};

const getShowtimesByMovieId = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie.showtimes); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addMovie = async (req, res) => {
    const { title, description, actors, director, trailer, releaseDate, duration, genre, status } = req.body;

    const poster = req.files && req.files.poster ? `uploads/${req.files.poster[0].filename}` : null;
    const image = req.files && req.files.image ? `uploads/${req.files.image[0].filename}` : null;  
    const trailerFile = req.files && req.files.trailer ? `uploads/${req.files.trailer[0].filename}` : null;

    try {
        const existingMovie = await Movie.findOne({ title });

        if (existingMovie) {
            return res.status(400).json({ message: 'Phim đã tồn tại' });
        }

        const lastMovie = await Movie.findOne().sort({ movieId: -1 }); 
        let movieId = 'MV001';  

        if (lastMovie) {
            const lastMovieId = lastMovie.movieId;
            const lastNumber = parseInt(lastMovieId.replace('MV', ''), 10);  // Lấy số sau 'MV'
            movieId = `MV${String(lastNumber + 1).padStart(3, '0')}`;  // Tăng movieId lên 1
        }

        const newMovie = new Movie({
            movieId,  
            title,
            description,
            actors,
            director,
            trailer: trailerFile,
            releaseDate,
            duration,
            genre,
            status,
            poster,
            image,
        });

        await newMovie.save();

        if (newMovie.poster) {
            newMovie.poster = `${req.protocol}://${req.get('host')}/${newMovie.poster}`;
        }
        if (newMovie.image) {
            newMovie.image = `${req.protocol}://${req.get('host')}/${newMovie.image}`;
        }
        if (newMovie.trailer) {
            newMovie.trailer = `${req.protocol}://${req.get('host')}/${newMovie.trailer}`;
        }

        res.status(201).json({ message: 'Phim mới đã được tạo thành công', movie: newMovie });
    } catch (error) {
        console.error('Error while adding movie:', error);
        res.status(500).json({ error: error.message });
    }
};
const updateMovie = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    let poster = req.files && req.files.poster ? `uploads/${req.files.poster[0].filename}` : null;
    let image = req.files && req.files.image ? `uploads/${req.files.image[0].filename}` : null;
    let trailerFile = req.files && req.files.trailer ? `uploads/${req.files.trailer[0].filename}` : null;

    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Phim không tồn tại' });
        }

        movie.title = updateData.title || movie.title;
        movie.description = updateData.description || movie.description;
        movie.actors = updateData.actors || movie.actors;
        movie.director = updateData.director || movie.director;
        movie.releaseDate = updateData.releaseDate || movie.releaseDate;
        movie.duration = updateData.duration || movie.duration;
        movie.genre = updateData.genre || movie.genre;
        movie.status = updateData.status || movie.status;

        if (poster) {
            movie.poster = poster;
        }
        if (image) {
            movie.image = image;
        }
        if (trailerFile) {
            movie.trailer = trailerFile;
        }

        await movie.save();

        if (movie.poster) {
            movie.poster = `${req.protocol}://${req.get('host')}/${movie.poster}`;
        }
        if (movie.image) {
            movie.image = `${req.protocol}://${req.get('host')}/${movie.image}`;
        }
        if (movie.trailer) {
            movie.trailer = `${req.protocol}://${req.get('host')}/${movie.trailer}`;
        }

        res.status(200).json({ message: 'Cập nhật phim thành công', movie });
    } catch (error) {
        console.error('Lỗi khi cập nhật phim:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllMoviesAdmin = async (req, res) => {
    try {
        const movies = await Movie.find(); 
        res.status(200).json({ message: 'Admin lấy danh sách tất cả phim thành công', movies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAllMovies = async (req, res) => {
    try {
        await Movie.deleteMany(); 
        res.status(200).json({ message: 'Tất cả phim đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    getAllMovies,
    getMovieById,
    getShowtimesByMovieId,
    addMovie,
    updateMovie,
    deleteMovie,
    getAllMoviesAdmin,
    deleteAllMovies
};

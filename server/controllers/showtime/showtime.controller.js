import Showtime from '../../models/showtime/showtime.model.js';
//xóa 2 dòng sau vì không dùng đến
import Movie from '../../models/movie/movie.model.js'; 
import Theater from '../../models/theater/theater.model.js';

const getShowtimesByTheater = async (req, res) => {
    const { id } = req.params;
    try {
        const showtimes = await Showtime.find({ theaterId: id }).populate('movieId', 'name');
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getShowtimesByMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const showtimes = await Showtime.find({ movieId: id }).populate('theaterId', 'name');
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addShowtime = async (req, res) => {
    const { movieId, theaterId, showtime, room } = req.body;
    const newShowtime = new Showtime({ movieId, theaterId, showtime, room });

    try {
        await newShowtime.save();
        res.status(201).json(newShowtime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateShowtime = async (req, res) => {
    const { id } = req.params;
    const { room, showtime } = req.body;

    try {
        const updatedShowtime = await Showtime.findByIdAndUpdate(
            id,
            { room, showtime },
            { new: true, runValidators: true }
        );

        if (!updatedShowtime) {
            return res.status(404).json({ message: 'Lịch chiếu không tồn tại' });
        }

        res.status(200).json(updatedShowtime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAllShowtimes = async (req, res) => {
    try {
        const result = await Showtime.deleteMany(); // Xóa tất cả các showtime
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Không có suất chiếu nào để xóa' });
        }
        res.status(200).json({ message: 'Tất cả suất chiếu đã bị xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteShowtime = async (req, res) => {
    const { id } = req.params;

    try {
        const showtime = await Showtime.findByIdAndDelete(id);
        if (!showtime) {
            return res.status(404).json({ message: 'Lịch chiếu không tồn tại' });
        }

        res.status(200).json({ message: 'Lịch chiếu đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getShowtimesByTheater, getShowtimesByMovie, addShowtime, updateShowtime, deleteShowtime, deleteAllShowtimes };

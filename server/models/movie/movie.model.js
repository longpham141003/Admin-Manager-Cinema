import mongoose from 'mongoose';

const { Schema } = mongoose;

const MovieSchema = new Schema({
    movieId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    actors: {
        type: [String] // Mảng tên diễn viên
    },
    director: {
        type: String
    },
    trailer: {
        type: String
    },
    releaseDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    poster: {
        type: String
    },
    image: {
        type: String
    },
    showtimes: [{
        type: String // Giả sử là mảng các chuỗi đại diện cho giờ chiếu
    }],
    status: {
        type: String,
        enum: ['Đang chiếu', 'Sắp chiếu'], // Giới hạn trạng thái phim
        required: true
    }
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;

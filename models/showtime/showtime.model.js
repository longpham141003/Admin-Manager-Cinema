import mongoose from 'mongoose';

const { Schema } = mongoose;

const ShowtimeSchema = new Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    theaterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true
    },
    showtime: {
        type: Date,
        required: true
    },
    room: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Showtime = mongoose.model('Showtime', ShowtimeSchema);

export default Showtime;

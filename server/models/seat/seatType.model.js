import mongoose from 'mongoose';

const { Schema } = mongoose;

const seatTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('SeatType', seatTypeSchema);

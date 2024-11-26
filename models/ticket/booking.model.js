import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookingSchema = new Schema({
    bookingNumber: {
        type: String,
        required: true,
        unique: true
    },
    seatId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    showTimeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Showtime',
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'booked', 'canceled'],
        default: 'available'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;

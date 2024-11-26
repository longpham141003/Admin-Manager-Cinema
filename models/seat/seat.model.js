import mongoose from 'mongoose';

const { Schema } = mongoose;

const SeatSchema = new Schema({
    seatNumber: { 
        type: String, 
        required: true, 
        unique: true 
    }, 
    seatType: {
        type: Schema.Types.ObjectId, 
        ref: 'SeatType', 
        required: true  
    }, 
    status: { 
        type: String, 
        enum: ['available', 'booked'], 
        default: 'available' 
    }  
});

const Seat = mongoose.model('Seat', SeatSchema);

export default Seat;

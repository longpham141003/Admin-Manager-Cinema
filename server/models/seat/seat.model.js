import mongoose from 'mongoose';

const { Schema } = mongoose;

const SeatSchema = new Schema({
    seatNumber: { 
        type: String, 
        required: true, 
        unique: true 
    }, // Số ghế duy nhất (A1, B2, ...)
    seatType: {
        type: Schema.Types.ObjectId, 
        ref: 'SeatType', 
        required: true  
    }, // Loại ghế liên kết với SeatType
    status: { 
        type: String, 
        enum: ['available', 'booked'], 
        default: 'available' 
    }  // Trạng thái của ghế: available hoặc booked
});

const Seat = mongoose.model('Seat', SeatSchema);

export default Seat;

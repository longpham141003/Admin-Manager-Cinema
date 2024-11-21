import mongoose from 'mongoose';

const { Schema } = mongoose;

const TheaterSchema = new Schema({
    theaterId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    totalRooms: {
        type: Number,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Theater = mongoose.model('Theater', TheaterSchema);
export default Theater;

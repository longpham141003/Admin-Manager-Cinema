import Booking from '../../models/ticket/booking.model.js'; 
import Seat from '../../models/seat/seat.model.js';

const createBooking = async (req, res) => {
    try {
        const { seatIds, showTimeId } = req.body;

        const seats = await Seat.find({ _id: { $in: seatIds } }).populate('seatType');

        if (!seats || seats.length === 0) {
            return res.status(400).json({ error: 'Ghế không tồn tại' });
        }

        const totalPrice = seats.reduce((total, seat) => {
            return total + (seat.seatType.price || 0); 
        }, 0); 

        const newBooking = new Booking({
            bookingNumber: `BOOKING-${Date.now()}`,
            seatId: seatIds,
            showTimeId,
            totalPrice, 
            status: 'available',
        });

        await newBooking.save();

        
        res.status(201).json({
            message: 'Đặt chỗ thành công',
            booking: {
                ...newBooking._doc,
                totalPrice, 
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllBookingsWithDetails = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate({
                path: 'seatId',
                select: 'seatNumber seatType status', 
                populate: {
                    path: 'seatType', 
                    select: 'price' 
                }
            })
            .populate('showTimeId'); 

        const formattedBookings = bookings.map(booking => {
            return {
                ...booking.toObject(),
                seatId: booking.seatId.map(seat => ({
                    ...seat.toObject(),
                    status: 'booked',
                    price: seat.seatType.price 
                })),
                totalPrice: booking.totalPrice 
            };
        });

        res.status(200).json(formattedBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getBookingById = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id).populate('seatId').populate('showTimeId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking does not exist.' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking does not exist.' });
        }
        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking does not exist.' });
        }

        const seat = await Seat.findById(booking.seatId);
        if (seat) {
            seat.status = 'available';
            await seat.save();
        }

        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteAllBookings = async (req, res) => {
    try {
        await Booking.deleteMany();

        await Seat.updateMany({}, { status: 'available' });

        res.status(200).json({ message: 'Đã xóa tất cả đặt chỗ' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createBooking,
    getAllBookingsWithDetails,
    getBookingById,
    updateBookingStatus,
    deleteBooking,
    deleteAllBookings 
};

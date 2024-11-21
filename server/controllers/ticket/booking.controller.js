import Booking from '../../models/ticket/booking.model.js'; // Đổi tên đường dẫn
import Seat from '../../models/seat/seat.model.js';

const createBooking = async (req, res) => {
    try {
        const { seatIds, showTimeId } = req.body;

        // Lấy thông tin ghế
        const seats = await Seat.find({ _id: { $in: seatIds } }).populate('seatType');

        if (!seats || seats.length === 0) {
            return res.status(400).json({ error: 'Ghế không tồn tại' });
        }

        // Tính tổng giá tiền
        const totalPrice = seats.reduce((total, seat) => {
            return total + (seat.seatType.price || 0); // Lấy giá từ loại ghế
        }, 0); 

        const newBooking = new Booking({
            bookingNumber: `BOOKING-${Date.now()}`,
            seatId: seatIds,
            showTimeId,
            totalPrice, // Lưu tổng tiền vào đối tượng booking
            status: 'available',
        });

        await newBooking.save();

        // Trả về thông tin booking mới cùng với tổng tiền
        res.status(201).json({
            message: 'Đặt chỗ thành công',
            booking: {
                ...newBooking._doc,
                totalPrice, // Thêm tổng tiền vào phản hồi
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllBookingsWithDetails = async (req, res) => {
    try {
        // Lấy tất cả các booking và populate thông tin ghế và buổi chiếu
        const bookings = await Booking.find()
            .populate({
                path: 'seatId',
                select: 'seatNumber seatType status', // Chọn các trường cần thiết
                populate: {
                    path: 'seatType', // Populate loại ghế để lấy giá tiền
                    select: 'price' // Chọn chỉ trường giá tiền
                }
            })
            .populate('showTimeId'); // Populate thông tin buổi chiếu

        // Đảm bảo rằng trạng thái của ghế và giá vé được cập nhật đúng
        const formattedBookings = bookings.map(booking => {
            return {
                ...booking.toObject(),
                seatId: booking.seatId.map(seat => ({
                    ...seat.toObject(),
                    status: 'booked', // Đặt trạng thái ghế thành 'booked'
                    price: seat.seatType.price // Thêm giá tiền từ loại ghế
                })),
                totalPrice: booking.totalPrice // Lấy totalPrice từ booking
            };
        });

        // Trả về danh sách các booking với chi tiết
        res.status(200).json(formattedBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Lấy đặt chỗ theo ID
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

// Cập nhật trạng thái đặt chỗ
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

// Xóa đặt chỗ
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
        // Xóa tất cả đặt chỗ
        await Booking.deleteMany();

        // Nếu cần, có thể cập nhật trạng thái ghế về 'available'
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

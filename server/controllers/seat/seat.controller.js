import Seat from '../../models/seat/seat.model.js';
import SeatType from '../../models/seat/seatType.model.js';

// Tạo ghế
const createSeats = async (req, res) => {
    try {
        const seatTypes = await SeatType.find(); // Lấy tất cả loại ghế
        const totalRows = req.body.rows; // Số hàng
        const totalColumns = req.body.columns; // Số cột
        
        const seats = []; // Mảng chứa ghế

        // Kiểm tra xem có đủ loại ghế không
        if (seatTypes.length < 3) {
            return res.status(400).json({ error: 'Cần có ít nhất 3 loại ghế để tạo.' });
        }

        // Tạo ghế với từng loại ghế
        for (let row = 1; row <= totalRows; row++) {
            for (let column = 1; column <= totalColumns; column++) {
                const seatNumber = String.fromCharCode(64 + row) + column; // "A1", "A2",...

                let seatTypeId;

                // Ghế VIP từ C3 đến C8 và D3 đến D8
                if ((row === 3 && column >= 3 && column <= 8) || (row === 4 && column >= 3 && column <= 8)) {
                    seatTypeId = seatTypes[1]._id; // Ghế VIP
                } 
                // Ghế đôi ở hàng cuối (hàng cuối sẽ là hàng F)
                else if (row === totalRows) {
                    if (column % 2 === 1 && column <= 10) {
                        seatTypeId = seatTypes[2]._id; // Ghế đôi
                    } else {
                        continue; // Bỏ qua các cột chẵn
                    }
                } 
                // Ghế thường
                else {
                    seatTypeId = seatTypes[0]._id; // Ghế thường
                }

                seats.push({ seatNumber, seatType: seatTypeId, status: 'available' });
            }
        }

        await Seat.insertMany(seats);
        res.status(201).json({ message: 'Tạo ghế thành công', seats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật trạng thái ghế
const updateSeatStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const seat = await Seat.findByIdAndUpdate(id, { status }, { new: true });
        if (!seat) {
            return res.status(404).json({ message: 'Ghế không tồn tại' });
        }
        res.status(200).json({ message: 'Trạng thái ghế đã được cập nhật', seat });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả ghế với loại ghế (populate SeatType)
const getAllSeats = async (req, res) => {
    try {
        const seats = await Seat.find().populate('seatType'); // Lấy thông tin loại ghế
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy ghế theo ID
const getSeatById = async (req, res) => {
    const { id } = req.params;

    try {
        const seat = await Seat.findById(id).populate('seatType');
        if (!seat) {
            return res.status(404).json({ message: 'Ghế không tồn tại' });
        }
        res.status(200).json(seat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa tất cả ghế
const deleteAllSeats = async (req, res) => {
    try {
        await Seat.deleteMany({});
        res.status(200).json({ message: 'Đã xóa tất cả ghế' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createSeats,
    updateSeatStatus,
    getAllSeats,
    getSeatById,
    deleteAllSeats
};

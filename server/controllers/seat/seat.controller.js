import Seat from '../../models/seat/seat.model.js';
import SeatType from '../../models/seat/seatType.model.js';
import seatConfig from './seatConfig.js';

const createSeats = async (req, res) => {
    try {
        const seatTypes = await SeatType.find(); 
        const totalRows = req.body.rows; 
        const totalColumns = req.body.columns; 
        
        const seats = []; 

        if (seatTypes.length < seatConfig.minSeatTypes) {
            return res.status(400).json({ error: `Cần có ít nhất ${seatConfig.minSeatTypes} loại ghế để tạo.` });
        }

        for (let row = 1; row <= totalRows; row++) {
            for (let column = 1; column <= totalColumns; column++) {
                const seatNumber = String.fromCharCode(64 + row) + column;

                let seatTypeId;

                if (seatConfig.vipSeats.rows.includes(row) && column >= seatConfig.vipSeats.columns[0] && column <= seatConfig.vipSeats.columns[1]) {
                    seatTypeId = seatTypes[seatConfig.vipSeatType]._id;
                } 
                else if (row === totalRows) {
                    if (column % 2 === 1 && column <= seatConfig.lastRowSeat.maxColumn) {
                        seatTypeId = seatTypes[seatConfig.lastRowSeatType]._id;
                    } else {
                        continue;
                    }
                } 
                else {
                    seatTypeId = seatTypes[seatConfig.defaultSeatType]._id;
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

const getAllSeats = async (req, res) => {
    try {
        const seats = await Seat.find().populate('seatType'); 
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

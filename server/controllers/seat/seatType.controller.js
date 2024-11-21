import SeatType from '../../models/seat/seatType.model.js';

// Phương thức để tạo loại ghế
const createSeatTypes = async (req, res) => {
  try {
      const seatTypes = req.body; // Giả sử body là một mảng các loại ghế
      const savedSeatTypes = await SeatType.insertMany(seatTypes);
      res.status(201).json({ message: 'Tạo các loại ghế thành công', seatTypes: savedSeatTypes });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Phương thức để lấy tất cả loại ghế
const getAllSeatTypes = async (req, res) => {
    try {
        const seatTypes = await SeatType.find();
        res.status(200).json(seatTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Phương thức để xóa tất cả loại ghế
const deleteAllSeatTypes = async (req, res) => {
  try {
      await SeatType.deleteMany(); // Xóa tất cả loại ghế
      res.status(200).json({ message: 'Đã xóa tất cả loại ghế' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export { createSeatTypes, getAllSeatTypes, deleteAllSeatTypes };

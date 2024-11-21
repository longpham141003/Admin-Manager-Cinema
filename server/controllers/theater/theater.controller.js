// controllers/theater/theater.controller.js
import Theater from '../../models/theater/theater.model.js';

// 1. Lấy danh sách rạp
const getTheaters = async (req, res) => {
    try {
        const theaters = await Theater.find();
        res.status(200).json(theaters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Xóa tất cả các rạp (chỉ cho admin)
const deleteAllTheaters = async (req, res) => {
    try {
        const result = await Theater.deleteMany(); // Xóa tất cả các rạp
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Không có rạp nào để xóa' });
        }
        res.status(200).json({ message: 'Tất cả rạp đã bị xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Lấy chi tiết rạp
const getTheaterById = async (req, res) => {
    const { id } = req.params;
    try {
        const theater = await Theater.findById(id);
        if (!theater) {
            return res.status(404).json({ message: 'Rạp không tồn tại' });
        }
        res.status(200).json(theater);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Thêm rạp mới
const addTheater = async (req, res) => {
    const { name, location, totalRooms, openingHours } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !location || !totalRooms || !openingHours) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin rạp' });
    }

    try {
        // Lấy danh sách tất cả các rạp để xác định mã theaterId
        const theaters = await Theater.find();

        // Tạo mã theaterId mới dựa trên số lượng rạp hiện có
        const theaterId = `R${String(theaters.length + 1).padStart(3, '0')}`;

        // Tạo một rạp mới với mã theaterId tự động
        const newTheater = new Theater({
            theaterId,
            name,
            location,
            totalRooms,
            openingHours
        });

        // Lưu rạp mới vào cơ sở dữ liệu
        await newTheater.save();

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'Rạp mới đã được tạo thành công', theater: newTheater });
    } catch (error) {
        console.error('Error while adding theater:', error);
        res.status(500).json({ error: error.message });
    }
};

// 5. Cập nhật thông tin rạp
const updateTheater = async (req, res) => {
    const { id } = req.params;
    const { name, address, phone } = req.body;

    try {
        const updatedTheater = await Theater.findByIdAndUpdate(
            id,
            { name, address, phone },
            { new: true, runValidators: true }
        );

        if (!updatedTheater) {
            return res.status(404).json({ message: 'Rạp không tồn tại' });
        }

        res.status(200).json(updatedTheater);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 6. Xóa rạp
const deleteTheater = async (req, res) => {
    const { id } = req.params;

    try {
        const theater = await Theater.findByIdAndDelete(id);
        if (!theater) {
            return res.status(404).json({ message: 'Rạp không tồn tại' });
        }

        res.status(200).json({ message: 'Rạp đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xuất các controller
export {
    getTheaters,
    getTheaterById,
    addTheater,
    updateTheater,
    deleteTheater,
    deleteAllTheaters
};

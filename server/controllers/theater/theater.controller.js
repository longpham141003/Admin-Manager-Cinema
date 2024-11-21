import Theater from '../../models/theater/theater.model.js';

const getTheaters = async (req, res) => {
    try {
        const theaters = await Theater.find();
        res.status(200).json(theaters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAllTheaters = async (req, res) => {
    try {
        const result = await Theater.deleteMany(); 
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Không có rạp nào để xóa' });
        }
        res.status(200).json({ message: 'Tất cả rạp đã bị xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

const addTheater = async (req, res) => {
    const { name, location, totalRooms, openingHours } = req.body;

    if (!name || !location || !totalRooms || !openingHours) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin rạp' });
    }

    try {
        const theaters = await Theater.find();

        const theaterId = `R${String(theaters.length + 1).padStart(3, '0')}`;

        const newTheater = new Theater({
            theaterId,
            name,
            location,
            totalRooms,
            openingHours
        });

        await newTheater.save();

        res.status(201).json({ message: 'Rạp mới đã được tạo thành công', theater: newTheater });
    } catch (error) {
        console.error('Error while adding theater:', error);
        res.status(500).json({ error: error.message });
    }
};

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

export {
    getTheaters,
    getTheaterById,
    addTheater,
    updateTheater,
    deleteTheater,
    deleteAllTheaters
};

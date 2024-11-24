import Snack from '../../models/snack/snack.model.js';
import fs from 'fs';

const getAllSnacks = async (req, res) => {
    try {
        const snacks = await Snack.find();
        res.status(200).json(snacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSnackById = async (req, res) => {
    const { id } = req.params;
    try {
        const snack = await Snack.findById(id); // Tìm theo _id
        if (!snack) {
            return res.status(404).json({ message: 'Snack not found' });
        }

        if (snack.image) {
            snack.image = `${req.protocol}://${req.get('host')}/${snack.image}`;
        }

        res.status(200).json(snack);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Thêm sản phẩm mới (Chỉ admin)
const addSnack = async (req, res) => {
    const { name, price, quantity } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;  // Lưu đường dẫn ảnh vào database

    try {
        // Kiểm tra nếu sản phẩm đã tồn tại
        const existingSnack = await Snack.findOne({ name });

        if (existingSnack) {
            existingSnack.quantity += quantity;
            await existingSnack.save();
            return res.status(200).json({ message: 'Sản phẩm đã tồn tại, đã tăng số lượng tồn kho.', snack: existingSnack });
        }

        // Tìm mã sản phẩm cao nhất và tạo mã mới
        const lastSnack = await Snack.findOne().sort({ productId: -1 });  // Lấy sản phẩm có mã lớn nhất
        let productId = 'SP001';  // Mặc định mã sản phẩm là SP001 nếu không có sản phẩm nào

        if (lastSnack) {
            const lastProductId = lastSnack.productId;
            const lastNumber = parseInt(lastProductId.replace('SP', ''), 10);  // Lấy số sau 'SP'
            productId = `SP${String(lastNumber + 1).padStart(3, '0')}`;  // Tăng mã sản phẩm lên 1
        }

        // Tạo sản phẩm mới
        const newSnack = new Snack({
            productId,
            name,
            image,
            price,
            quantity
        });

        // Lưu sản phẩm mới vào DB
        await newSnack.save();

        // Tạo đường dẫn URL cho ảnh
        if (newSnack.image) {
            newSnack.image = `${req.protocol}://${req.get('host')}/${newSnack.image}`;
        }

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'Sản phẩm mới đã được tạo thành công', snack: newSnack });
    } catch (error) {
        console.error('Error while adding snack:', error);
        res.status(500).json({ error: error.message });
    }
};


// 4. Cập nhật sản phẩm (Chỉ admin)
const updateSnack = async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;  // Các trường từ req.body
    const image = req.file ? `uploads/${req.file.filename}` : null;  // Nếu có ảnh mới, lấy đường dẫn ảnh mới

    try {
        const snack = await Snack.findById(id);
        if (!snack) {
            return res.status(404).json({ message: 'Snack not found' });
        }

        // Cập nhật thông tin sản phẩm từ req.body
        snack.name = name || snack.name;
        snack.price = price || snack.price;
        snack.quantity = quantity || snack.quantity;
        
        // Nếu có ảnh mới, cập nhật ảnh
        if (image) {
            snack.image = image;
        }

        // Lưu sản phẩm đã cập nhật
        await snack.save();

        // Tạo đường dẫn URL cho ảnh nếu có
        if (snack.image) {
            snack.image = `${req.protocol}://${req.get('host')}/${snack.image}`;
        }

        res.status(200).json({ message: 'Sản phẩm đã được cập nhật', snack });
    } catch (error) {
        console.error('Error while updating snack:', error);
        res.status(500).json({ error: error.message });
    }
};

// 5. Xóa sản phẩm (Chỉ admin)
const deleteSnack = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSnack = await Snack.findOneAndDelete({ _id: id });
        if (!deletedSnack) {
            return res.status(404).json({ message: 'Snack not found' });
        }
        res.status(200).json({ message: 'Snack deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export các controller
export {
    getAllSnacks,
    getSnackById,
    addSnack,
    updateSnack,
    deleteSnack
};

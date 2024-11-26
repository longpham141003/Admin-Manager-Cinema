import Snack from '../../models/snack/snack.model.js';

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
        const snack = await Snack.findById(id);
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

const addSnack = async (req, res) => {
    const { name, price, quantity } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;  

    try {
        const existingSnack = await Snack.findOne({ name });

        if (existingSnack) {
            existingSnack.quantity += quantity;
            await existingSnack.save();
            return res.status(200).json({ message: 'Sản phẩm đã tồn tại, đã tăng số lượng tồn kho.', snack: existingSnack });
        }

        const lastSnack = await Snack.findOne().sort({ productId: -1 });  
        let productId = 'SP001'; 

        if (lastSnack) {
            const lastProductId = lastSnack.productId;
            const lastNumber = parseInt(lastProductId.replace('SP', ''), 10);  
            productId = `SP${String(lastNumber + 1).padStart(3, '0')}`;  
        }

        const newSnack = new Snack({
            productId,
            name,
            image,
            price,
            quantity
        });

        await newSnack.save();

        if (newSnack.image) {
            newSnack.image = `${req.protocol}://${req.get('host')}/${newSnack.image}`;
        }

        res.status(201).json({ message: 'Sản phẩm mới đã được tạo thành công', snack: newSnack });
    } catch (error) {
        console.error('Error while adding snack:', error);
        res.status(500).json({ error: error.message });
    }
};


const updateSnack = async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;  
    const image = req.file ? `uploads/${req.file.filename}` : null;  

    try {
        const snack = await Snack.findById(id);
        if (!snack) {
            return res.status(404).json({ message: 'Snack not found' });
        }

        snack.name = name || snack.name;
        snack.price = price || snack.price;
        snack.quantity = quantity || snack.quantity;
        
        if (image) {
            snack.image = image;
        }

        await snack.save();

        if (snack.image) {
            snack.image = `${req.protocol}://${req.get('host')}/${snack.image}`;
        }

        res.status(200).json({ message: 'Sản phẩm đã được cập nhật', snack });
    } catch (error) {
        console.error('Error while updating snack:', error);
        res.status(500).json({ error: error.message });
    }
};

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

export {
    getAllSnacks,
    getSnackById,
    addSnack,
    updateSnack,
    deleteSnack
};

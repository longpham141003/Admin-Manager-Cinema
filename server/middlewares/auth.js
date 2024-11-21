import jwt from 'jsonwebtoken';
import User from '../models/user/user.model.js';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        // Nếu yêu cầu là cập nhật thông tin và người dùng là chính mình
        if (req.method === 'PUT' && req.path === '/api/users/update-info') {
            return next(); // Không cần token cho yêu cầu này
        }

        // Kiểm tra token
        if (!token) {
            return res.status(401).json({ message: 'Vui lòng đăng nhập.' });
        }

        // Giải mã token
        const decoded = jwt.verify(token, 'your_jwt_secret');
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Token không hợp lệ.' });
        }

        // Tìm người dùng theo userId từ token
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Người dùng không tồn tại.' });
        }

        // Gắn thông tin người dùng vào req.user
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};

const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        auth, // Gọi middleware auth trước để xác thực
        (req, res, next) => {
            // Nếu không yêu cầu role cụ thể, cho phép truy cập
            if (!roles.length || roles.includes(req.user.role)) {
                return next();
            }
            // Trả về lỗi nếu người dùng không có quyền
            return res.status(403).json({ message: 'Bạn không có quyền truy cập vào tài nguyên này.' });
        }
    ];
};

export { auth, authorize };

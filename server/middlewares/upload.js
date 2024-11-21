import multer from 'multer';
import path from 'path';

// Cấu hình nơi lưu trữ file và cách đặt tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đảm bảo thư mục uploads tồn tại
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Cấu hình bộ lọc file để chấp nhận cả ảnh và video
const fileFilter = (req, file, cb) => {
  // Định nghĩa các loại tệp hình ảnh và video được phép upload
  const imageTypes = /jpeg|jpg|png|gif/;
  const videoTypes = /mp4|avi|mov/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype.toLowerCase();

  // Kiểm tra xem tệp có phải là ảnh hay video không
  if (imageTypes.test(extname) && imageTypes.test(mimetype)) {
    cb(null, true); // Chấp nhận file ảnh
  } else if (videoTypes.test(extname) && videoTypes.test(mimetype)) {
    cb(null, true); // Chấp nhận file video (trailer)
  } else {
    cb('Error: Only images and videos are allowed!'); // Trả về lỗi nếu tệp không phải ảnh hoặc video
  }
};

// Khởi tạo multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 40 * 1024 * 1024 }, // Giới hạn kích thước file là 10MB (có thể thay đổi tùy nhu cầu)
  fileFilter: fileFilter
});

export default upload;

import crypto from 'crypto';
//xóa mấy dòng này
<<<<<<< HEAD
=======

>>>>>>> 80f873b88fe00ac6b274dd998ead1ef48d1aa1f5
const generateVerificationCode = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); 
};

export default generateVerificationCode;

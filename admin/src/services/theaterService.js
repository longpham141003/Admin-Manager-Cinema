import api from '../utils/api';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token không tồn tại.');
  }
  return token;
};


// Lấy danh sách rạp
export const getTheaterList = async () => {
  const token = getToken(); 

  try {
    const response = await api.get('/theaters', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nrạp phim:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Tạo mới , thêm
export const createTheater = async (theaterData) => {
  const token = getToken();

  console.log("Theater data being sent:", theaterData);

  try {
    const response = await api.post('/theaters', theaterData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo rạp:', error);
    throw error;
  }
};

// Lấy thông tin chi tiết của một rạp
export const getTheaterById = async (theaterId) => {
  const token = getToken(); 

  try {
    const response = await api.get(`/theaters/${theaterId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi laasi thông tin rạp:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Cập nhật thông tin người dùng
export const updateTheater = async (theaterId, updatedData) => {
  const token = getToken(); // Gọi hàm lấy token nếu cần thiết

  try {
    const response = await api.put(`/theaters/${theaterId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật người dùng:', error);
    throw error;
  }
};

// Xoá người dùng theo ID
export const deleteTheaterById = async (theaterId) => {
  const token = getToken(); 

  try {
    const response = await api.delete(`/theaters/${theaterId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xoá rạp:', error.response ? error.response.data : error.message);
    throw error;
  }
};
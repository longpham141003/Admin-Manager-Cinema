import api from '../utils/api';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token không tồn tại.');
  }
  return token;
};

// Lấy danh sách người dùng
export const getUserList = async () => {
  const token = getToken(); 

  try {
    const response = await api.get('/users/all', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Xoá người dùng theo ID
export const deleteUserById = async (userId) => {
  const token = getToken(); 

  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xoá người dùng:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Lấy thông tin chi tiết của một người dùng
export const getUserById = async (userId) => {
  const token = getToken(); 

  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi laasi thông tin người dùng:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Tạo mới một người dùng
export const createUser = async (userData) => {
  const token = getToken();

  console.log("User data being sent:", userData);

  try {
    // Chỉnh sửa URL endpoint thành '/create'
    const response = await api.post('/users/create', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    throw error;
  }
};



// Cập nhật thông tin người dùng
export const updateUser = async (userId, updatedData) => {
  const token = getToken(); // Gọi hàm lấy token nếu cần thiết

  try {
    const response = await api.put(`/users/${userId}`, updatedData, {
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

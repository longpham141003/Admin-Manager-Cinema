import api from '../utils/api';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token không tồn tại.');
  }
  return token;
};

export const getMovieList = async () => {
  const token = getToken();
  
  try {
    const response = await api.get('/movies', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("API response: ", response);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phim:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getMovieById = async (movieId) => {
  const token = getToken();

  if (!token) {
    throw new Error('Token không hợp lệ hoặc không tồn tại');
  }

  try {
    const response = await api.get(`/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Trả về chi tiết bộ phim
  } catch (error) {
    console.error('Lỗi khi lấy thông tin phim:', error.response ? error.response.data : error.message);
    throw error;
  }
};




export const createMovie = async (movieData) => {
  const token = getToken();

  try {
    const response = await api.post('/movies', movieData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo phim:', error);
    throw error;
  }
};

export const deleteMovieById = async (movieId) => {
  const token = getToken(); 

  try {
    const response = await api.delete(`/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xoá phim:', error.response ? error.response.data : error.message);
    throw error;
  }
};



export const updateMovie = async (movieId, updatedData) => {
  const token = getToken(); 

  try {
    const response = await api.put(`/movies/${movieId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    });
    console.log('API response:', response);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật phim:', error);
    throw error;
  }
};
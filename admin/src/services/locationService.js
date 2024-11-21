import axios from 'axios';

// URL cơ bản của API lấy từ biến môi trường
const host = process.env.REACT_APP_API_HOST;

// Hàm gọi API
const callAPI = async (api) => {
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};

// Lấy danh sách tỉnh/thành phố
const getProvinces = async () => {
  try {
    const data = await callAPI(`${host}?depth=1`);
    return data; // Trả về dữ liệu tỉnh/thành phố
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
    throw error;
  }
};

// Lấy danh sách huyện/quận theo mã tỉnh
const getDistrictsByProvinceCode = async (provinceCode) => {
  try {
    const data = await callAPI(`${host}p/${provinceCode}?depth=2`);
    return data.districts; // Trả về danh sách huyện/quận
  } catch (error) {
    console.error('Lỗi khi lấy danh sách huyện/quận:', error);
    throw error;
  }
};

// Lấy danh sách xã/phường theo mã huyện/quận
const getWardsByDistrictCode = async (districtCode) => {
  try {
    const data = await callAPI(`${host}d/${districtCode}?depth=2`);
    return data.wards; // Trả về danh sách xã/phường
  } catch (error) {
    console.error('Lỗi khi lấy danh sách xã/phường:', error);
    throw error;
  }
};

export {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
};

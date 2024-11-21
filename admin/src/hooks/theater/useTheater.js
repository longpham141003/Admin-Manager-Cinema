import { useContext, useEffect } from 'react';
import { useStatusContext } from "../useStatusContext";  
import { TheaterContext } from '../../contexts/TheaterContext'
import { getTheaterList as fetchTheaterService } from '../../services/theaterService' 

export const useTheater = () => {
  const {theaters, setTheaters} = useContext(TheaterContext);
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext();

  const loadTheaters = async() => {
    startLoading();
    clearError();
    const token = localStorage.getItem('token');
    if(!token){
      setError('Bạn cần đăng nhập để truy cập trang này');
      stopLoading();
    }

    try {
      const data = await fetchTheaterService(token);
      setTheaters(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách rạp');
      setError('Không thể tải danh sách rạp. ');
    }
    finally{
      stopLoading(false);
    }
  };
  useEffect(() => {
    loadTheaters();
  }, []);

  return{ theaters, loading, errorMessage, loadTheaters };
}
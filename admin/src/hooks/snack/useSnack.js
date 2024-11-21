import { SnackContext } from '../../contexts/SnackContext'
import { useStatusContext } from "../useStatusContext";  
import { getSnackList as fetchSnackService } from '../../services/snackService' 
import { useContext, useEffect } from 'react';

export const useSnack = () => {
  const {snacks, setSnacks} = useContext(SnackContext);
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext();

  const loadSnacks = async() => {
    startLoading();
    clearError();
    const token = localStorage.getItem('token');

    if(!token){
      setError('Bạn cần đăng nhập để truy cập trang này');
      stopLoading();
    }

    try{
      const data = await fetchSnackService(token);
      setSnacks(data);
    }
    catch(error){
      console.error('Lỗi khi lấy danh sách người dùng');
      setError('Không thể tải danh sách đồ ăn. Vui lòng thử lại sau');
    }
    finally{
      stopLoading(false);
    }
  };
  useEffect(() => {
    loadSnacks();
  }, []);

  return { snacks, loading, errorMessage, loadSnacks };
}

import { useContext, useEffect, useState } from 'react';
import { useStatusContext } from "../useStatusContext";  
import { getUserById, updateUser } from '../../services/userService'; 
import { UserContext } from '../../contexts/UserContext';

export const useEditUser = (userId) => {
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext(); 
  const { users, setUsers,fullName, setFullName, username, setUserName, email, setEmail, phone, setPhone } = useContext(UserContext);
  const [role, setRole] = useState('Khách hàng');

  useEffect(() => {
    const fetchUser = async () => {
      startLoading(); 
      clearError(); 

      try {
        const userData = await getUserById(userId);  
        console.log('User Data:', userData);
        setFullName(userData.hoTen);  
        setUserName(userData.username);
        setEmail(userData.email);
        setPhone(userData.soDienThoai);
        setRole(userData.role);
      } catch (error) {
        setError("Lỗi khi tải thông tin người dùng.");
      } finally {
        stopLoading(false);
      }
    };

    fetchUser(userId);
  }, [userId]);

  const editUser = async () => {
    startLoading();
    clearError("");

    try {
      await updateUser(userId, {
        hoTen: fullName,
        username,
        email,
        soDienThoai: phone,
        role
      });
      return true;
    } catch (error) {
      setError("Lỗi khi cập nhật thông tin người dùng.");
      return false;
    } finally {
      stopLoading(false);
    }
  };

  return { fullName, setFullName, username, setUserName, email, setEmail, phone, setPhone, role, setRole, loading, errorMessage, editUser };
}

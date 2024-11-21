// src/hooks/useAddUser.js
import {  useContext, useState } from 'react';
import { createUser } from '../../services/userService'; // Đảm bảo import hàm createUser
import { useStatusContext } from "../useStatusContext";  
import { UserContext } from '../../contexts/UserContext';

export const useAddUser = () => {
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext();
  const { users, setUsers,fullName, setFullName, username, setUserName, email, setEmail, phone, setPhone } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  
  const addUser = async () => {
    startLoading();
    clearError();
    try {
      const newUser = {
        hoTen: fullName,
        username,
        email,
        soDienThoai: phone,
        password,
        role,
      };
      await createUser(newUser); 
      return true; 
    } catch (error) {
      setError('Lỗi khi thêm người dùng.', error);
      return false; 
    } finally {
      stopLoading();
    }
  };

  return {
    fullName,
    setFullName,
    username,
    setUserName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    role,
    setRole,
    addUser,
  };
};

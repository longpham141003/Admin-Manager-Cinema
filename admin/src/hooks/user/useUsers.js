import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getUserList as fetchUsersService } from '../../services/userService';
import { useStatusContext } from "../useStatusContext";  

const useUsers = () => {
    const { users, setUsers } = useContext(UserContext);
    const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext(); 
    const loadUsers = async () => { 
        startLoading();
        clearError(); 
        try {
            const data = await fetchUsersService(); 
            setUsers(data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
            setError('Không thể tải danh sách người dùng. Vui lòng thử lại.');
        } finally {
            stopLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return { users, loading, errorMessage, loadUsers };
};

export default useUsers;

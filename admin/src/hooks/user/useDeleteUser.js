import { deleteUserById } from "../../services/userService";
import { useStatusContext } from "../useStatusContext";  


const useDeleteUser = () => {
    const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext(); 

    const deleteUser = async (userId) => {
        startLoading(); 
        clearError(); 

        try {
            await deleteUserById(userId); // Gọi hàm xoá người dùng từ dịch vụ
        } catch (error) {
            setError("Không thể xóa người dùng."); // Xử lý lỗi nếu có
        } finally {
            stopLoading(); // Dừng loading
        }
    };

    return { deleteUser, loading, errorMessage }; // Trả về các giá trị cần thiết
};

export default useDeleteUser;

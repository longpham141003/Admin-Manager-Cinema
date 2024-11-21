
import { deleteTheaterById } from "../../services/theaterService";
import { useStatusContext } from "../useStatusContext";  


const useDeleteTheater = () => {
    const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext(); 

    const deleteTheater = async (theaterId) => {
        startLoading(); 
        clearError(); 

        try {
            await deleteTheaterById(theaterId); // Gọi hàm xoá người dùng từ dịch vụ
        } catch (error) {
            setError("Không thể xóa người dùng."); // Xử lý lỗi nếu có
        } finally {
            stopLoading(); // Dừng loading
        }
    };

    return { deleteTheater, loading, errorMessage };
};

export default useDeleteTheater;

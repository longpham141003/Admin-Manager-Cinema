import { useContext } from 'react';
import { useStatusContext } from "../useStatusContext";
import { deleteSnackById } from "../../services/snackService";

export const useDeleteSnacks = () => {
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext();

  const deleteSnack = async (snackId) => {
    startLoading();
    clearError();

    if (!snackId) {
      setError("ID sản phẩm không hợp lệ.");
      stopLoading();
      return false;
    }

    try {
      const result = await deleteSnackById(snackId);
      console.log("Snack deleted:", result); // Log kết quả xóa
      return true;
    } catch (error) {
      setError("Lỗi khi xoá sản phẩm.");
      console.error("Error:", error);
      return false;
    } finally {
      stopLoading();
    }
  };

  return {
    deleteSnack,
    loading,
    errorMessage,
  };
};

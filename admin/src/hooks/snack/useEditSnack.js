import { useContext, useEffect, useState } from 'react';
import { useStatusContext } from "../useStatusContext";  
import { updateSnack, getSnackById } from "../../services/snackService";
import { SnackContext } from '../../contexts/SnackContext';
export const useEditSnack = (snackId) => {
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext(); 
  const {snacks, setSnacks, name, setName, image, setImage, price, setPrice, quantity, setQuantity} = useContext(SnackContext);
  
  // Lấy thông tin snack khi component load
  useEffect(() => {
    const fetchSnack = async () => {
      startLoading();
      clearError();
  
      if (!snackId) {
        setError("ID sản phẩm không hợp lệ.");
        stopLoading(false);
        return;
      }
  
      try {
        const snackData = await getSnackById(snackId);
        setName(snackData.name);
        setImage(snackData.image);  // Đảm bảo xử lý hình ảnh khi nhận dữ liệu
        setPrice(snackData.price);
        setQuantity(snackData.quantity);
      } catch (error) {
        setError("Lỗi khi tải thông tin sản phẩm.");
      } finally {
        stopLoading(false);
      }
    };
    
    if (snackId) {
      fetchSnack();
    }
  }, [snackId]);

  // Cập nhật snack
  const editSnack = async () => {
    startLoading();
    clearError();

    // Kiểm tra dữ liệu đầu vào
    console.log("Tên:", name);
    console.log("Ảnh:", image); // Kiểm tra file ảnh
    console.log("Giá:", price);
    console.log("Số lượng:", quantity);

    try {
        const updatedSnack = new FormData();
        updatedSnack.append('name', name);
        
        // Kiểm tra xem image có phải là File object không
        if (image && image instanceof File) {
            updatedSnack.append('image', image);
        } else {
            console.warn("Image không phải là một file hợp lệ.");
        }
        
        updatedSnack.append('price', price);
        updatedSnack.append('quantity', quantity);
        
        console.log("Snack Data:", Array.from(updatedSnack.entries())); // Log dữ liệu từ `FormData`
        
        // Gửi yêu cầu cập nhật lên server
        const result = await updateSnack(snackId, updatedSnack);
        console.log("Snack updated:", result); // Xem kết quả trả về từ server

        return true;
    } catch (error) {
        setError("Lỗi khi cập nhật sản phẩm.");
        console.error("Error:", error);
        return false;
    } finally {
        stopLoading();
    }
};

  return {
    name,
    setName,
    image,
    setImage,
    price,
    setPrice,
    quantity,
    setQuantity,
    editSnack,
  };
};

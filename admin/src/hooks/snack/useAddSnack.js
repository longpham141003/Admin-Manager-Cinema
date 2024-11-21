import { SnackContext } from "../../contexts/SnackContext";
import { createSnack } from "../../services/snackService";
import { useStatusContext } from "../useStatusContext";  
import {  useContext, useState } from 'react';

export const useAddSnack = () => {
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext();
  const {snacks, setSnacks, name, setName, image, setImage, price, setPrice, quantity, setQuantity} = useContext(SnackContext);

  const addSnack = async () => {
    startLoading();
    clearError();
    try {
      const newSnack = new FormData();
      newSnack.append('name', name);
      newSnack.append('image', image);
      newSnack.append('price', price);
      newSnack.append('quantity', quantity);
  
      console.log("Snack Data: ", newSnack);
      await createSnack(newSnack); 
      return true;
    } catch (error) {
      console.error('Error while adding snack: ', error);
      setError('Lỗi khi thêm sản phẩm');
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
    addSnack,
  }
}
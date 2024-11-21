import { useStatusContext } from "../useStatusContext";
import {  useState } from 'react';
import { createTheater } from '../../services/theaterService';
import { TheaterContext } from "../../contexts/TheaterContext";
import { useContext } from 'react';

export const useAddTheater = () => {
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext();
  const {theaters, setTheaters, name, setName, location, setLocation, totalRooms, setTotalRooms, openingHours, setOpeningHours} = useContext(TheaterContext);

  const addTheater = async () => {
    startLoading();
    clearError();
    try {
      const newTheater = {
        name,
        location,
        totalRooms,
        openingHours
      };
      await createTheater(newTheater); 
      return true; 
    } catch (error) {
      setError('Lỗi khi thêm rạp mới', error);
      return false;
    } finally {
      stopLoading();
    }
  };
  return {
    name,setName,
    location, setLocation, 
    totalRooms, setTotalRooms,
    openingHours, setOpeningHours,
    addTheater,
  };
} 
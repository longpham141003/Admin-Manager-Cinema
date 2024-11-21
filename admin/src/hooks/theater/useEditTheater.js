import { useContext, useEffect, useState } from 'react';
import { useStatusContext } from "../useStatusContext";  
import { getTheaterById, updateTheater } from '../../services/theaterService'; 
import { TheaterContext } from '../../contexts/TheaterContext';

export const useEditTheater = (theaterId) => {
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext(); 
  const {theaters, setTheaters, name, setName, location, setLocation, totalRooms, setTotalRooms, openingHours, setOpeningHours} = useContext(TheaterContext);

  useEffect(() => {
    const fetchTheater = async () => {
      startLoading(); 
      clearError(); 

      try {
        const theaterData = await getTheaterById(theaterId);  
        console.log('Theater Data:', theaterData);
        setName(theaterData.name);  
        setLocation(theaterData.location);
        setTotalRooms(theaterData.totalRooms);
        setOpeningHours(theaterData.openingHours);
      } catch (error) {
        setError("Lỗi khi tải thông tin rạp", error);
      } finally {
        stopLoading(false);
      }
    };

    fetchTheater(theaterId);
  }, [theaterId]);

  const editTheater = async () => {
    startLoading();
    clearError("");

    try {
      await updateTheater(theaterId, {
        name,
        location,
        totalRooms,
        openingHours,
      });
      return true;
    } catch (error) {
      setError("Lỗi khi cập nhật thông tin rạp:", error);
      return false;
    } finally {
      stopLoading(false);
    }
  };

  return { name, setName, location, setLocation, totalRooms, setTotalRooms, openingHours, setOpeningHours, loading, errorMessage, editTheater };
}

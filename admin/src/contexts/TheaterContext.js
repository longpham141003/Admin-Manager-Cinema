import React, {createContext, useState, } from 'react';

export const TheaterContext = createContext();
export const TheaterProvider = ({children}) => {
  const [theaters, setTheaters] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [totalRooms, setTotalRooms] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  return(
    <TheaterContext.Provider value={{theaters, setTheaters, name, setName, location, setLocation, totalRooms, setTotalRooms, openingHours, setOpeningHours}}>
      {children}
    </TheaterContext.Provider>
  );
}
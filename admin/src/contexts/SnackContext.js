import React, { createContext, useState } from 'react';

export const SnackContext = createContext();

export const SnackProvider = ({ children }) => {
  const [snackDetails, setSnackDetails] = useState({
    name: '',
    image: '',
    price: '',
    quantity: '',
  });
  const [snacks, setSnacks] = useState([]);

  // Function to update specific fields of snackDetails
  const updateSnackDetails = (field, value) => {
    setSnackDetails(prevDetails => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <SnackContext.Provider value={{
      snacks,
      setSnacks,
      snackDetails,
      setSnackDetails,
      updateSnackDetails,
    }}>
      {children}
    </SnackContext.Provider>
  );
};

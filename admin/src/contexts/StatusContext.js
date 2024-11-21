import React, { createContext, useState, useContext } from 'react';

export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const setError = (message) => setErrorMessage(message);
  const clearError = () => setErrorMessage('');

  return (
    <StatusContext.Provider value={{ loading, startLoading, stopLoading, errorMessage, setError, clearError }}>
      {children}
    </StatusContext.Provider>
  );
};


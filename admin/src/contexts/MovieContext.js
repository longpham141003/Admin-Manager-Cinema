import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movieDetails, setMovieDetails] = useState({
    title: '',
    description: '',
    actors: '',
    director: '',
    releaseDate: '',
    duration: '',
    genre: '',
    status: 'Đang chiếu',
    trailer: '',
    poster: '',
    image: '',
  });
  const [movies, setMovies] = useState([]);

  // Function to update specific fields of movieDetails
  const updateMovieDetails = (field, value) => {
    setMovieDetails(prevDetails => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <MovieContext.Provider value={{
      movieDetails,
      setMovieDetails,
      movies,
      setMovies,
      updateMovieDetails,
    }}>
      {children}
    </MovieContext.Provider>
  );
};

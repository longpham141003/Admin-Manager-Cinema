import { MovieContext } from "../../contexts/MovieContext";
import { createMovie } from "../../services/movieService";
import { useStatusContext } from "../useStatusContext";  
import {  useContext, useState } from 'react';

export const useAddMovie = () => {
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext();
  const {movies, setMovies, title, setTitle, description, setDescription, actors, setActors, director, setDirector, releaseDate, setReleaseDate, duration, setDuration, genre, setGenre, status, setStatus, trailer, setTrailer, poster, setPoster, image, setImage} = useContext(MovieContext);

  const addMovie = async () => {
    startLoading();
    clearError();
    try {
      const newMovie = new FormData();
      newMovie.append('title', title);
      newMovie.append('description', description);
      newMovie.append('actors', actors);
      newMovie.append('director', director);
      newMovie.append('releaseDate', releaseDate);
      newMovie.append('duration', duration);
      newMovie.append('genre', genre);
      newMovie.append('status', status);
      newMovie.append('image', image);
      newMovie.append('trailer', trailer);
      newMovie.append('poster', poster);

      console.log("Movie Data: ", newMovie);
      await createMovie(newMovie); 
      return true;
    } catch (error) {
      console.error('Error while adding movie: ', error);
      setError('Lỗi khi thêm phim moiws');
      return false;
    } finally {
      stopLoading();
    }
  };
  

  return {
    title, setTitle,
    description, setDescription,
    actors, setActors,
    director, setDirector,
    releaseDate, setReleaseDate,
    duration, setDuration,
    genre, setGenre,
    status, setStatus,
    trailer, setTrailer,
    poster, setPoster,
    image, setImage,
    addMovie,
  }
}
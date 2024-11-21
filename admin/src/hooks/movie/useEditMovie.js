import { useContext, useEffect, useState } from 'react';
import { useStatusContext } from "../useStatusContext";  
import { updateMovie, getMovieById } from "../../services/movieService";
import { MovieContext } from '../../contexts/MovieContext';

export const useEditMovie = (movieId) => {
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext(); 
  const {movieDetails, setMovieDetails , movies, setMovies, title, setTitle, description, setDescription, actors, setActors, director, setDirector, releaseDate, setReleaseDate, duration, setDuration, genre, setGenre, status, setStatus, trailer, setTrailer, poster, setPoster, image, setImage} = useContext(MovieContext);
  
  // Lấy thông tin Movie khi component load
  useEffect(() => {
    const fetchMovie = async () => {
      startLoading();
      clearError();
  
      if (!movieId) {
        setError("ID phim không hợp lệ.");
        stopLoading(false);
        return;
      }
  
      try {
        const movieData = await getMovieById(movieId);
        setTitle(movieData.title);
        setDescription(movieData.description);
        setActors(movieData.actors);
        setDirector(movieData.director);
        setReleaseDate(movieData.releaseDate);
        setDuration(movieData.duration);
        setGenre(movieData.genre);
        setStatus(movieData.status);
        setTrailer(movieData.trailer);
        setPoster(movieData.poster);
        setImage(movieData.image);
      } catch (error) {
        setError("Lỗi khi tải thông tin phim:", error);
      } finally {
        stopLoading(false);
      }
    };
    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  // Cập nhật Movie
  const editMovie = async () => {
    startLoading();
    clearError();

    // Kiểm tra dữ liệu đầu vào
    console.log("Tên:", title);
    console.log("Ảnh:", description); 
    console.log("Giá:", actors);
    console.log("Số lượng:", director);
    console.log("Số lượng:", releaseDate);
    console.log("Số lượng:", duration);
    console.log("Số lượng:", genre);
    console.log("Số lượng:", status);
    console.log("Số lượng:", trailer);
    console.log("Số lượng:", poster);
    console.log("Số lượng:", image);

    try {
        const updateMovie = new FormData();
        updateMovie.append('title', title);
        
        
        if (image && image instanceof File) {
            updateMovie.append('image', image);
        } else {
            console.warn("Image không phải là một file hợp lệ.");
        }

        if (poster && poster instanceof File) {
            updateMovie.append('poster', poster);
        } else {
            console.warn("poster không phải là một file hợp lệ.");
        }

        if (trailer && trailer instanceof File) {
          updateMovie.append('trailer', trailer);
        } else {
            console.warn("trailer không phải là một file hợp lệ.");
        }
        
        updateMovie.append('description', description);
        updateMovie.append('actors', actors);
        updateMovie.append('director', director);
        updateMovie.append('releaseDate', releaseDate);
        updateMovie.append('duration', duration);
        updateMovie.append('genre', genre);
        updateMovie.append('status', status);
        console.log("Movie Data:", Array.from(updateMovie.entries())); 
        
        
        const result = await updateMovie(movieId, updateMovie);
        console.log("Movie updated:", result); 

        return true;
    } catch (error) {
        setError("Lỗi khi cập nhật movie:",error);
        console.error("Error:", error);
        return false;
    } finally {
        stopLoading();
    }
};

  return {
    title, setTitle, description, setDescription, actors, setActors, director, setDirector, releaseDate, setReleaseDate, duration, setDuration, genre, setGenre, status, setStatus, trailer, setTrailer, poster, setPoster, image, setImage,
    editMovie,
  };
};

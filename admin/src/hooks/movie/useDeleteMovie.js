import { useContext } from 'react';
import { useStatusContext } from "../useStatusContext";
import { deleteMovieById } from "../../services/movieService";

export const useDeleteMovies = () => {
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext();

  const deleteMovie = async (movieId) => {
    startLoading();
    clearError();

    if (!movieId) {
      setError("ID sản phẩm không hợp lệ.");
      stopLoading();
      return false;
    }

    try {
      const result = await deleteMovieById(movieId);
      console.log("Movie deleted:", result); 
      return true;
    } catch (error) {
      setError("Lỗi khi xoá phim:", error);
      console.error("Error:", error);
      return false;
    } finally {
      stopLoading();
    }
  };

  return {
    deleteMovie,
    loading,
    errorMessage,
  };
};

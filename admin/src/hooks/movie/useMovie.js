import { useStatusContext } from "../useStatusContext";  
import { getMovieList as fetchMovieService } from '../../services/movieService' 
import { useContext, useEffect } from 'react';
import { MovieContext } from '../../contexts/MovieContext';

export const useMovie = () => {
  const {movies, setMovies} = useContext(MovieContext);
  const { loading, startLoading, stopLoading, errorMessage, setError, clearError } = useStatusContext();

  

  const loadMovies = async() => {
    startLoading();
    clearError();
    const token = localStorage.getItem('token');

    if(!token){
      setError('Bạn cần đăng nhập để truy cập trang này');
      stopLoading();
    }

    try{
      const data = await fetchMovieService(token);
      setMovies(data);
    }
    catch(error){
      console.error('Lỗi khi lấy danh sách phim');
      setError('Không thể tải danh sách phim. Vui lòng thử lại sau');
    }
    finally{
      stopLoading(false);
    }
  };
  useEffect(() => {
    loadMovies();
  }, []);

  return { movies, loading, errorMessage, loadMovies };
}

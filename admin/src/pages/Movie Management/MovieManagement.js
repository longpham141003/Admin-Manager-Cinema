import React from 'react';
import "../../pages/Movie Management/moviemanagement.css";
import Button from "../../components/button.js";
import ActionToolbar from '../../components/ActionToolbar.js';
import Panigation from "../../components/Panigation.js";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useMovie } from '../../hooks/movie/useMovie.js';
import { useNavigate } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom';
import { useDeleteMovies } from '../../hooks/movie/useDeleteMovie.js';

const MovieManagement = () => {
    const { movies, loading, errorMessage, loadMovies, loadMovieDetails, selectedMovieDetails } = useMovie();
    const navigate = useNavigate();
    
    const { deleteMovie, loading: deleteLoading, errorMessage: deleteError } = useDeleteMovies();

    const handleDeleteMovie = async (movieId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này?');
        if (confirmDelete) {
            await deleteMovie(movieId); 
            loadMovies(); 
        }
    };
    return (
        <>
            <NavLink to="/admin/addmovie">
                <Button label="Tạo phim mới" />
            </NavLink>
            <div className="body-content">
                <ActionToolbar />
                <div className="horizontal-line" />
                <div className="data-content">
                    {loading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : errorMessage ? (
                        <p className="error-message">{errorMessage}</p>
                    ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th>Mã phim</th>
                                <th>Tên phim</th>
                                <th>Hình ảnh</th>
                                <th>Thể loại</th>
                                <th>Trạng thái</th>
                                <th>Chi tiết</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.movieId}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{movie.movieId}</td>
                                <td>{movie.title}</td>
                                <td>
                                    <img  src={`${process.env.REACT_APP_BASE_URL}/${movie.poster}`} alt={`${movie.title} Poster`} className="movie-poster" />
                                </td>
                                <td>{movie.genre}</td>
                                <td>
                                    <span className={`status ${movie.status === "Đang chiếu" ? "status-showing" : "status-coming"}`}>
                                            {movie.status}
                                    </span>
                                </td>
                                <td>
                                <button onClick={() => navigate(`/admin/moviedetail/${movie._id}`)}>Xem chi tiết</button>
                                </td>
                                <td>
                                    <button className="btn btn-edit">
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-delete" onClick={() => handleDeleteMovie(movie._id)}>
                                        <i className="fas fa-trash" />
                                    </button>
                                </td>                
                            </tr>
                        ))} 
                        </tbody>
                    </table>
                    )}
                </div>
                <Panigation />
            </div>
        </>
    );
};

export default MovieManagement;

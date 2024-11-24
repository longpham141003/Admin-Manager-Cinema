import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovie } from '../../hooks/movie/useMovie';

const MovieDetail = () => {
  const { movieId } = useParams(); // Lấy movieId từ URL
  const navigate = useNavigate();
  const { movies, loading, errorMessage, loadMovies } = useMovie(); 

  // Tìm bộ phim theo ID từ danh sách phim
  const movie = movies.find((movie) => movie._id === movieId);

  useEffect(() => {
    if (!movies.length) {
      loadMovies(); // Nếu danh sách phim chưa được tải, tải danh sách phim
    }
  }, [movies, loadMovies]);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;
  if (!movie) return <p>Không tìm thấy thông tin phim.</p>;

  const { title, description, actors, director, releaseDate, duration, genre, trailer, image } = movie;

  return (
    <div className="movie-details-container">
      <div className="movie-details-header">
        <h2>{title}</h2>
        <button className="movie-details-close-btn" onClick={() => navigate(-1)}>Đóng</button>
      </div>

      <div className="movie-details-content">
        <div className="movie-details-summary">
          <h3>Mô tả</h3>
          <p>{description}</p>
          <div className="movie-details-image">
          <img src={`${process.env.REACT_APP_BASE_URL}/${image}`} alt="Ảnh phim"  />
        </div>    
        </div>
        <div className="movie-details-info">
          <div className="movie-details-form-row">
            <div className="movie-details-form-group">
              <strong>Thể loại: </strong>
              <span>{genre}</span>
            </div>
            <div className="movie-details-form-group">
              <strong>Thời gian: </strong>
              <span>{duration} phút</span>
            </div>
          </div>

          <div className="movie-details-form-row">
            <div className="movie-details-form-group">
              <strong>Đạo diễn: </strong>
              <span>{director}</span>
            </div>
            <div className="movie-details-form-group">
              <strong>Ngày phát hành: </strong>
              <span>{releaseDate}</span>
            </div>
          </div>

          <div className="movie-details-form-row">
            <div className="movie-details-form-group">
              <strong>Diễn viên: </strong>
              <span>{actors.join(', ')}</span>
            </div>
          </div>


          <div className="movie-details-media-section">
            
            <div className="movie-details-trailer">
              <video width="600" controls>
                <source src={`${process.env.REACT_APP_BASE_URL}/${trailer}`} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

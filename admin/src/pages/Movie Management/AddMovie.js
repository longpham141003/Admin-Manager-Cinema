import React from 'react';
import "./moviemanagement.css"; // Sử dụng CSS giống như trong MovieManagement
import Button from "../../components/button";
import { useNavigate } from 'react-router-dom';
import { useAddMovie } from '../../hooks/movie/useAddMovie';

const AddMovie = () => {
    const navigate = useNavigate();
    const {
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
    } = useAddMovie();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await addMovie();  

        if (success) {
            navigate('/admin/moviemanagement');  
        }
    };
    return (
        <>
            <Button label="Tạo phim mới" />
            <div className="body-content">
                <div className="data-content" onSubmit={handleSubmit} >
                    <h2>Thêm Phim</h2>
                    <form className="add-movie-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="movie-name">Tên phim</label>
                                <input type="text" id="movie-name" placeholder="Nhập tên phim" value={title} onChange={(e) => setTitle(e.target.value)} /> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="genre">Thể loại</label>
                                <input type="text" id="genre" placeholder="Nhập thể loại" value={genre} onChange={(e) => setGenre(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="duration">Thời gian</label>
                                <input type="text" id="duration" placeholder="Nhập thời gian (phút)" value={duration} onChange={(e) => setDuration(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="release-date">Ngày phát hành</label>
                                <input type="date" id="release-date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="actors">Diễn viên</label>
                                <input type="text" id="actors" placeholder="Nhập tên diễn viên" value={actors} onChange={(e) => setActors(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="director">Đạo diễn</label>
                                <input type="text" id="director" placeholder="Nhập tên đạo diễn" value={director} onChange={(e) => setDirector(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="status">Trạng thái</label>
                                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="showing">Đang chiếu</option>
                                    <option value="coming">Sắp chiếu</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="image">Hình ảnh</label>
                                <input
                                type="file"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])} // Lưu file vào state
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="poster">Poster</label>
                                <input
                                type="file"
                                id="poster"
                                onChange={(e) => setPoster(e.target.files[0])} // Lưu file vào state
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="trailer">Trailer</label>
                                <input
                                type="file"
                                id="trailer"
                                onChange={(e) => setTrailer(e.target.files[0])} // Lưu file vào state
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="description">Mô tả phim</label>
                                <textarea 
                                    id="description" 
                                    placeholder="Nhập mô tả phim" 
                                    rows="4" 
                                    className="textarea-description"
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-save">Lưu</button>
                            <button type="button" className="btn btn-cancel" onClick={() => navigate('/admin/moviemanagement')}>Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddMovie;

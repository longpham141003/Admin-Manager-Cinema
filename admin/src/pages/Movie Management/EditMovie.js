import React from 'react';
import "./moviemanagement.css"; // Sử dụng CSS giống như trong MovieManagement
import Button from "../../components/button";

const EditMovie = () => {
    return (
        <>
            <Button label="Tạo phim mới" />
            <div className="body-content">
                <div className="data-content">
                    <h2>Thêm Phim</h2>
                    <form className="add-movie-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="movie-name">Tên phim</label>
                                <input type="text" id="movie-name" placeholder="Nhập tên phim" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="genre">Thể loại</label>
                                <input type="text" id="genre" placeholder="Nhập thể loại" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="duration">Thời gian</label>
                                <input type="text" id="duration" placeholder="Nhập thời gian (phút)" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="release-date">Ngày phát hành</label>
                                <input type="date" id="release-date" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="actors">Diễn viên</label>
                                <input type="text" id="actors" placeholder="Nhập tên diễn viên" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="director">Đạo diễn</label>
                                <input type="text" id="director" placeholder="Nhập tên đạo diễn" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="poster">Poster</label>
                                <input type="file" id="poster" placeholder="Nhập URL poster" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Hình ảnh</label>
                                <input type="file" id="image" placeholder="Nhập URL hình ảnh" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="trailer">Trailer</label>
                                <input type="file" id="trailer" placeholder="Nhập URL trailer" />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-save">Lưu</button>
                            <button type="button" className="btn btn-cancel">Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditMovie;

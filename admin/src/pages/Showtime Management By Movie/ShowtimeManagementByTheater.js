import React from 'react';
import "./showtimemanagement.css";
import Button from "../../components/button";
import ActionToolbar from '../../components/ActionToolbar';
import Panigation from "../../components/Panigation";

const ShowtimeManagementByTheater = () => {
    return (
        <>
            <Button label="Thêm suất chiếu mới" onClick={() => console.log('Thêm suất chiếu mới')} />
            <div className="body-content">
                <ActionToolbar />
                <div className="horizontal-line" />
                <div className="data-content">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th>ID suất chiếu</th>
                                <th>Tên rạp</th>
                                <th>Tên phim</th>
                                <th>Thời gian chiếu</th>
                                <th>Phòng chiếu</th>
                                <th>Thời gian sửa đổi</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Rạp 1 */}
                            <tr>
                                <td colSpan="8" className="theater-title">
                                    <strong>CGV Vincom</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>SC001</td>
                                <td>CGV Vincom</td>
                                <td>Avengers: Endgame</td>
                                <td>2024-10-07 19:00</td>
                                <td>Phòng 1</td>
                                <td>2024-10-01 14:30</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => console.log('Sửa suất chiếu')}>
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-delete" onClick={() => console.log('Xóa suất chiếu')}>
                                        <i className="fas fa-trash" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>SC002</td>
                                <td>CGV Vincom</td>
                                <td>Avengers: Endgame</td>
                                <td>2024-10-07 20:30</td>
                                <td>Phòng 2</td>
                                <td>2024-10-01 14:30</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => console.log('Sửa suất chiếu')}>
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-delete" onClick={() => console.log('Xóa suất chiếu')}>
                                        <i className="fas fa-trash" />
                                    </button>
                                </td>
                            </tr>

                            {/* Rạp 2 */}
                            <tr>
                                <td colSpan="8" className="theater-title">
                                    <strong>BHD Star</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>SC003</td>
                                <td>BHD Star</td>
                                <td>Spider-Man: No Way Home</td>
                                <td>2024-10-07 19:00</td>
                                <td>Phòng 1</td>
                                <td>2024-10-02 10:00</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => console.log('Sửa suất chiếu')}>
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-delete" onClick={() => console.log('Xóa suất chiếu')}>
                                        <i className="fas fa-trash" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>SC004</td>
                                <td>BHD Star</td>
                                <td>Spider-Man: No Way Home</td>
                                <td>2024-10-07 20:30</td>
                                <td>Phòng 2</td>
                                <td>2024-10-02 10:00</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => console.log('Sửa suất chiếu')}>
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-delete" onClick={() => console.log('Xóa suất chiếu')}>
                                        <i className="fas fa-trash" />
                                    </button>
                                </td>
                            </tr>
                            {/* Thêm các rạp và suất chiếu khác nếu cần */}
                        </tbody>
                    </table>
                </div>
                <Panigation />
            </div>
        </>
    );
};

export default ShowtimeManagementByTheater;

import React from 'react';

const TicketDetails = ({ ticket, onClose }) => {
    return (
        <div className="selected-row ticket-details">
            <span className="close" onClick={onClose}>&times;</span>
            <table>
                <tbody>
                    <tr>
                        <td><strong>ID suất chiếu:</strong></td>
                        <td>{ticket.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Tên phim:</strong></td>
                        <td>Phim A</td> {/* Thay bằng dữ liệu thực tế của phim */}
                    </tr>
                    <tr>
                        <td><strong>ID rạp:</strong></td>
                        <td>R001</td> {/* Thay bằng ID rạp thực tế */}
                    </tr>
                    <tr>
                        <td><strong>Ghế:</strong></td>
                        <td>A1, A2</td> {/* Thay bằng thông tin ghế thực tế */}
                    </tr>
                    <tr>
                        <td><strong>Thời gian chiếu:</strong></td>
                        <td>2024-10-05 14:00:00</td> {/* Thay bằng thời gian chiếu thực tế */}
                    </tr>
                    <tr>
                        <td><strong>Phòng chiếu:</strong></td>
                        <td>Phòng 1</td> {/* Thay bằng thông tin phòng chiếu thực tế */}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TicketDetails;

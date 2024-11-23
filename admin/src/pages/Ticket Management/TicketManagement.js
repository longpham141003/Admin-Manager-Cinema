import React, { useState } from 'react';
import "./ticketmanagement.css";
import Button from "../../components/button";
import ActionToolbar from '../../components/ActionToolbar';
import Panigation from "../../components/Panigation";
import TicketDetails from './TicketDetails';
const tickets = [
    {
        id: 1,
        accountName: "nguyenvana",
        bookingTime: "2024-10-01 10:00:00",
        totalAmount: "150000đ",
    },
    {
        id: 2,
        accountName: "tranthib",
        bookingTime: "2024-10-02 12:00:00",
        totalAmount: "120000đ",
    },
    // Thêm dữ liệu vé ở đây...
];
const TicketManagement = () => {
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    
    

    const handleViewDetails = (ticketId) => {
        setSelectedTicketId(ticketId);
    };

    const handleCloseDetails = () => {
        setSelectedTicketId(null);
    };

    return (
        <>
            <Button label="Tạo vé mới" />
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
                                <th>ID vé</th>
                                <th>Tài khoản đặt</th>
                                <th>Thời gian đặt vé</th>
                                <th>Tổng tiền</th>
                                <th>Xem chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <React.Fragment key={ticket.id}>
                                    <tr className={`${selectedTicketId === ticket.id ? "selected-row bordered" : ""}`}>
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.accountName}</td>
                                        <td>{ticket.bookingTime}</td>
                                        <td>{ticket.totalAmount}</td>
                                        <td>
                                            <button onClick={() => handleViewDetails(ticket.id)}>Xem chi tiết</button>
                                        </td>
                                    </tr>
                                    {selectedTicketId === ticket.id && (
                                        <tr>
                                            <td colSpan="6">
                                                <div className="movie-container">
                                                    <div className="movie-wrapper">
                                                        <TicketDetails ticket={ticket} onClose={handleCloseDetails} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Panigation />
            </div>
        </>
    );
};

export default TicketManagement;

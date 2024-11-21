import React from 'react';
import "./paymentmanagement.css"; // Đảm bảo có file CSS tương ứng
import Button from "../../components/button";
import ActionToolbar from '../../components/ActionToolbar';
import Panigation from "../../components/Panigation";

const PaymentManagement = () => {
    return (
        <>
            <Button label="Tạo giao dịch mới" onClick={() => console.log('Tạo giao dịch mới')} />
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
                                <th>Mã định danh giao dịch</th>
                                <th>Tài khoản</th>
                                <th>Số tiền</th>
                                <th>Thời gian giao dịch</th>
                                <th>Trạng thái giao dịch</th>
                                <th>Lý do lỗi (nếu có)</th>
                                <th>Hành động</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Dữ liệu mẫu */}
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>TX12345</td>
                                <td>Nguyễn Văn A</td>
                                <td>500,000 VNĐ</td>
                                <td>2024-10-07 10:00:00</td>
                                <td>Thành công</td>
                                <td></td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => console.log('Sửa giao dịch')}>
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-delete" onClick={() => console.log('Xóa giao dịch')}>
                                        <i className="fas fa-trash" />
                                    </button>
                                </td>
                                <td>Không có</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>TX12346</td>
                                <td>Trần Thị B</td>
                                <td>300,000 VNĐ</td>
                                <td>2024-10-06 15:30:00</td>
                                <td>Thất bại</td>
                                <td>Thẻ không hợp lệ</td>
                                <td>
                                    <button className="btn btn-edit" onClick={() => console.log('Sửa giao dịch')}>
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-delete" onClick={() => console.log('Xóa giao dịch')}>
                                        <i className="fas fa-trash" />
                                    </button>
                                </td>
                                <td>Ghi chú thêm</td>
                            </tr>
                            {/* Thêm các hàng khác nếu cần */}
                        </tbody>
                    </table>
                </div>
                <Panigation />
            </div>
        </>
    );
};

export default PaymentManagement;

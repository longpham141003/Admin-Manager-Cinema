import React from "react";
import './dashboard.css';

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-body-content">
        <div className="dashboard-left-content">
          <div className="dashboard-overview">
            <div className="dashboard-item dashboard-item1">
              <div className="dashboard-icon">
                <i className="fas fa-user-friends" />
              </div>
              <div className="dashboard-details">
                <h3>Tổng khách hàng</h3>
                <p>56 khách hàng</p>
                <small>Tổng số khách hàng được quản lý.</small>
              </div>
            </div>
            <div className="dashboard-item dashboard-item2">
              <div className="dashboard-icon">
                <i className="fas fa-database" />
              </div>
              <div className="dashboard-details">
                <h3>Tổng phim</h3>
                <p>1850 phim</p>
                <small>Tổng số phim được quản lý.</small>
              </div>
            </div>
            <div className="dashboard-item dashboard-item3">
              <div className="dashboard-icon">
                <i className="fas fa-ticket-alt" />
              </div>
              <div className="dashboard-details">
                <h3>Tổng đơn đặt vé</h3>
                <p>247 đơn đặt vé</p>
                <small>Tổng số hóa đơn đặt vé trong tháng.</small>
              </div>
            </div>
            <div className="dashboard-item dashboard-item4">
              <div className="dashboard-icon">
                <i className="fas fa-exclamation-circle" />
              </div>
              <div className="dashboard-details">
                <h3>Sắp hết chỗ</h3>
                <p>4 suất</p>
                <small>Số suất cần nhập thêm.</small>
              </div>
            </div>
          </div>
          <div className="dashboard-new-order">
            <h2>Đơn đặt vé</h2>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '70px'}}>ID đơn đặt vé</th>
                  <th style={{ width: '176px' }}>Tên khách hàng</th>
                  <th style={{ width: '100px'}}>Thời gian đặt</th>
                  <th style={{ width: '172px'}}>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ width: '70px'}}>AL3947</td>
                  <td style={{ width: '183px' }} >Phạm Thị Ngọc</td>
                  <td style={{ width: '100px'}}>10/10/2024 10:30</td>
                  <td style={{ width: '165px'}}>200.000 VNĐ</td>
                </tr>
                <tr>
                  <td style={{ width: '70px'}}>ER3835</td>
                  <td style={{ width: '183px' }}>Nguyễn Thị Mỹ Yến</td>
                  <td style={{ width: '100px'}}>10/10/2024 11:00</td>
                  <td style={{ width: '165px'}}>150.000 VNĐ</td>
                </tr>
                <tr>
                  <td style={{ width: '70px'}}>MD0837</td>
                  <td style={{ width: '183px' }}>Triệu Thanh Phú</td>
                  <td style={{ width: '100px'}}>09/10/2024 14:20</td>
                  <td style={{ width: '165px'}}>180.000 VNĐ</td>
                </tr>
                <tr>
                  <td style={{ width: '70px'}}>MT9835</td>
                  <td style={{ width: '183px' }}>Đặng Hoàng Phúc</td>
                  <td style={{ width: '100px'}}>08/10/2024 16:45</td>
                  <td style={{ width: '165px'}}>220.000 VNĐ</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="dashboard-new-customer">
            <h2>Khách hàng mới</h2>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '50px'}}>ID</th>
                  <th style={{ width: '200px'}}>Tên khách hàng</th>
                  <th style={{ width: '150px'}}>Ngày sinh</th>
                  <th style={{ width: '120px'}}>Số điện thoại</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ width: '50px'}}>#183</td>
                  <td style={{ width: '200px'}}>Hột vịt muối</td>
                  <td style={{ width: '150px'}}>21/7/1992</td>
                  <td style={{ width: '120px'}}>0921387221</td>
                </tr>
                <tr>
                  <td style={{ width: '50px'}}>#219</td>
                  <td style={{ width: '200px'}}>Bánh tráng trộn</td>
                  <td style={{ width: '150px'}}>30/4/1975</td>
                  <td style={{ width: '120px'}}>0912376352</td>
                </tr>
                <tr>
                  <td style={{ width: '50px'}}>#627</td>
                  <td style={{ width: '200px'}}>Cút rang bơ</td>
                  <td style={{ width: '150px'}}>12/3/1999</td>
                  <td style={{ width: '120px'}}>01287326654</td>
                </tr>
                <tr>
                  <td style={{ width: '50px'}}>#175</td>
                  <td style={{ width: '200px'}}>Hủ tiếu nam vang</td>
                  <td style={{ width: '150px'}}>4/12/2000</td>
                  <td style={{ width: '120px'}}>0912376763</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="dashboard-right-content">
          <div className="dashboard-right-data">
            <h2>Dữ liệu 6 tháng đầu vào</h2>
            <canvas id="dashboard-myChart" />
          </div>
          <div className="dashboard-right-revenue">
            <h2>Thống kê 6 tháng doanh thu</h2>
            <canvas id="dashboard-revenueChart" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from "react";

const ActionToolbar = () => {
  return (
      <div className="sup-body-content">
        <div className="items-left">
        <span style={{ color: 'black' }}>Hiện</span>
          <select>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>danh mục</span>
        </div>
        <div className="items-right">
          <label htmlFor="search">Tìm kiếm:</label>
          <input type="text" id="search" />
        </div>
      </div>
  );
};

export default ActionToolbar;

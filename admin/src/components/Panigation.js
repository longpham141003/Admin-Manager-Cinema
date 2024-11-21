import React from "react";

const Panigation = () => {
  return (
    <div className="footer-main-content">
      <div className="items-count">Hiện 1 đến 2 của 2 danh mục</div>
      <div className="panigation">
        <button className="btn-panigation">Lùi</button>
        <button className="btn-panigation active">1</button>
        <button className="btn-panigation">Tiếp</button>
      </div>
    </div>
  );
};

export default Panigation;

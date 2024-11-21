import React from "react";

const Button = ({ label }) => {
  return (
    <>
      <div className="header-main-content">
        <button className="btn btn-yellow">
          <i className="fas fa-plus" /> {label}
        </button>
        <button className="btn btn-blue">
          <i className="fas fa-copy" /> Sao chép
        </button>
        <button className="btn btn-green">
          <i className="fas fa-file-excel" /> Xuất Excel
        </button>
        <button className="btn btn-red">
          <i className="fas fa-file-pdf" /> Xuất PDF
        </button>
        <button className="btn btn-grey">
          <i className="fas fa-trash" /> Xóa
        </button>
      </div>
      <div className="horizontal-line" />
    </>
  );
};

export default Button;

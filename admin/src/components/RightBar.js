import React from "react";
import HeaderRightBar from "./HeaderRightBar";

const RightBar = ({ children, title }) => {
  return (
    <div  className="right-bar">
      <HeaderRightBar />
      <div className="content">
        <div className="time">
        <span className="title">{title}</span>
          <span className="datetime" id="datetime"></span>
        </div>
        <div  className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RightBar;

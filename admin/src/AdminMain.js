import React from "react";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";

const AdminMain = ({ children, title, ...props }) => {
  return (
    <div style={{backgroundColor: '#f5f5f5'}} className="admin" {...props}>
      <LeftBar />
      <RightBar title={title}>
        {children}
      </RightBar>
    </div>
  );
};

export default AdminMain;

import React from "react";
// import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import "./AppLayout.css";

const AppLayout = ({ children }) => {
  return (
    <div className="layout">
      {/* <Sidebar /> */}
      <div className="main-content">
        <Topbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;

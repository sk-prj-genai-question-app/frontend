import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">JLPT</div>
      <ul>
        <li>내 정보</li>
        <li>오답노트</li>
      </ul>
    </div>
  );
};

export default Sidebar;

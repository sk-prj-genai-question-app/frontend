import React from "react";
import "./TopBar.css";

const TopBar = ({ username }) => {
  return (
    <div className="topbar">
      <div className="topbar-right">
        <img
          src="/user.png"
          alt="user"
          className="user-icon"
        />
        <span>
          환영합니다, <strong>{username}</strong>User 님 ▼
        </span>
      </div>
    </div>
  );
};

export default TopBar;

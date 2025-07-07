import React, { useState } from "react";
import "./TopBar.css";

const TopBar = ({ username }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleDropdown = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {};

  const handleDarkModeToggle = () => {};

  const handleProfileEdit = () => {};

  return (
    <div className="topbar">
      <div className="topbar-right" onClick={toggleDropdown}>
        <img src="/user.png" alt="user" className="user-icon" />
        <span>
          {/* 환영합니다, <strong>{username}</strong> 님 ▼ */}
          환영합니다, <strong>User</strong> 님 {showMenu ? "▲" : "▼"}
        </span>

        {showMenu && (
          <div className="dropdown-menu">
            <button onClick={handleProfileEdit}>
              <img src="/edit-user.png" alt="edit" className="menu-icon2" />
              프로필 수정
            </button>
            <button onClick={handleLogout}>
              <img src="/logout.png" alt="logout" className="menu-icon" />
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

const TopBar = ({ username }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();  // ✅ 추가

  const toggleDropdown = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
      // 여기서 로그아웃 처리 (예: 토큰 삭제)
      // localStorage.removeItem("token"); 등 추가 가능
      navigate("/login");  // ✅ 로그인 페이지로 이동
  };

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

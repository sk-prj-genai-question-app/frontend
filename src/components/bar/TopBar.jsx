import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

const TopBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");

    if (accessToken && email) {
      // 이메일 @ 앞부분만 이름으로 사용
      const nameFromEmail = email.split("@")[0];
      setUsername(nameFromEmail);
    } else {
      setUsername("Guest");
    }
  }, []);

  const toggleDropdown = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    // 로그아웃 처리: 토큰과 이메일 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    setUsername("Guest");
    navigate("/login");
  };

  const handleProfileEdit = () => {
    // 프로필 수정 페이지로 이동 예시
    navigate("/profile-edit");
  };

  return (
    <div className="topbar">
      <div className="topbar-right" onClick={toggleDropdown} style={{ cursor: "pointer" }}>
        <img src="/user.png" alt="user" className="user-icon" />
        <span>
          환영합니다, <strong>{username}</strong> 님 {showMenu ? "▲" : "▼"}
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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

const TopBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [avatar, setAvatar] = useState("/user.png");  // 기본 이미지
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");
    const savedAvatar = localStorage.getItem("avatar");  // 저장된 avatar

    if (accessToken && email) {
      const nameFromEmail = email.split("@")[0];
      setUsername(nameFromEmail);
      setAvatar(savedAvatar || "/user.png");  // 저장된 이미지가 있으면 사용
    } else {
      setUsername("Guest");
      setAvatar("/user.png");  // 기본 이미지
    }
  }, []);

  const toggleDropdown = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("avatar");  // avatar도 삭제
    setUsername("Guest");
    setAvatar("/user.png");
    navigate("/login");
  };

  const handleProfileEdit = () => {
    navigate("/profile-edit");
  };

  return (
    <div className="topbar">
      <div className="topbar-right" onClick={toggleDropdown} style={{ cursor: "pointer" }}>
        <img src={avatar} alt="user" className="user-icon" /> {/* avatar 적용 */}
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

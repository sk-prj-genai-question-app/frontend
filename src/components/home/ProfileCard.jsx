import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  // 로그인 상태 판단
  const accessToken = localStorage.getItem('accessToken');
  const loggedEmail = localStorage.getItem('email');
  const savedAvatar = localStorage.getItem('avatar');

  // 이름 = 이메일 @ 앞부분 추출 함수
  const getNameFromEmail = (email) => {
    if (!email) return '';
    return email.split('@')[0];
  };

  // 표시할 정보 설정
  const displayEmail = accessToken && loggedEmail ? loggedEmail : user.email;
  const displayName = accessToken && loggedEmail ? getNameFromEmail(loggedEmail) : user.name;
  const displayAvatar = accessToken && savedAvatar ? savedAvatar : user.avatar;

  return (
    <div className="profile-card">
      <div className="avatar-wrapper">
        <img src={displayAvatar} alt="avatar" className="avatar" />
      </div>
      <h3>{displayName}</h3>
      <p>{displayEmail}</p>
    </div>
  );
};

export default ProfileCard;

import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  // 로그인 상태 판단
  const accessToken = localStorage.getItem('accessToken');
  const loggedEmail = localStorage.getItem('email');  // 로그인 시 이메일 저장했다고 가정

  // 이름 = 이메일 @ 앞부분 추출 함수
  const getNameFromEmail = (email) => {
    if (!email) return '';
    return email.split('@')[0];
  };

  // 로그인 상태면 loggedEmail과 분리된 이름으로 표시, 아니면 user 정보 그대로
  const displayEmail = accessToken && loggedEmail ? loggedEmail : user.email;
  const displayName = accessToken && loggedEmail ? getNameFromEmail(loggedEmail) : user.name;

  return (
    <div className="profile-card">
      <div className="avatar-wrapper">
        <img src={user.avatar} alt="avatar" className="avatar" />
        {/* 편집 버튼 등은 그대로 */}
      </div>
      <h3>{displayName}</h3>
      <p>{displayEmail}</p>
    </div>
  );
};

export default ProfileCard;

import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="avatar-wrapper">
        <img src={user.avatar} alt="avatar" className="avatar" />
        <button className="edit-button">
          <img src="/edit-icon.png" alt="edit" />
        </button>
      </div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
};

export default ProfileCard;

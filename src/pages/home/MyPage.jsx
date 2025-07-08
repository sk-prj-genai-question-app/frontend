import React from "react";
import ProfileCard from "../../components/home/ProfileCard";
import ExamInfoCard from "../../components/wrongnote/ExamInfoCard";
import ProgressCard from "../../components/home/ProgressCard";
import "./MyPage.css";

const MyPage = () => {
  const user = {
    name: "User",
    email: "user@example.com",
    phone: "+81 010-1234-5678",
    avatar: "/user.png",
  };

  return (
    <>
      <div className="main-grid">
        <div className="left">
          <ProfileCard user={user} />
        </div>
        <div className="right">
          <ExamInfoCard />
        </div>
      </div>
      <div className="progress-grid">
        <ProgressCard level="N1" subject="언어지식・독해" value={78} />
        <ProgressCard level="N2" subject="언어지식・독해" value={65} />
        <ProgressCard level="N3" subject="언어지식(문자・어휘)" value={85} />
        <ProgressCard level="N3" subject="언어지식(문법)・독해" value={92} />
      </div>
    </>
  );
};

export default MyPage;

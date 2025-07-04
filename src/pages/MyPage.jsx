import React from "react";
import ProfileCard from "../components/ProfileCard";
import ExamInfoCard from "../components/ExamInfoCard";
import ProgressCard from "../components/ProgressCard";
import AppLayout from "../components/AppLayout";
import "./MyPage.css";

const MyPage = () => {
  const user = {
    name: "User",
    email: "user@example.com",
    phone: "+81 010-1234-5678",
    avatar: "/user.png",
  };

  return (
    <AppLayout>
      <div className="main-grid">
        <div className="left">
          <ProfileCard user={user} />
        </div>
        <div className="right">
          <ExamInfoCard />
        </div>
      </div>
      <div className="progress-grid">
        <ProgressCard title="N1 언어지식" value={78} />
        <ProgressCard title="N1 독해" value={65} />
        <ProgressCard title="N2 어휘" value={92} />
        <ProgressCard title="N3 독해" value={85} />
        <ProgressCard title="N4 어휘" value={60} />
        <ProgressCard title="N5 듣기" value={73} />
      </div>
    </AppLayout>
  );
};

export default MyPage;

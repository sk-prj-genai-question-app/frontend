import React from 'react';
import profileImage from '../assets/profile.png';
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Dashboard = () => {
  const dDay = 100;

  const stats = [
    { type: '단어', percentage: 80 },
    { type: '문법', percentage: 65 },
    { type: '독해', percentage: 50 },
  ];

  return (
    <div className="dashboard">
      <div className="profile">
        <img src={profileImage} alt="프로필" className="profile-img" />
        <div>
          <h2>사용자 이름</h2>
          <p>JLPT 시험까지 <strong>D-{dDay}</strong></p>
        </div>
      </div>

      <div className="guide">
        <h3>오늘의 학습 가이드 📖</h3>
        <ul>
          <li>문법 문제가 취약합니다. 문법 문제 푸는 것을 추천합니다.</li>
          <li>문법 문제 풀기: 15개</li>
          <li>독해 문제 풀기: 10개</li>
        </ul>
      </div>

      {/* ✅ 원형 정답률 섹션 */}
      <div className="stats">
        <h3>문제 유형별 정답률 📊</h3>
        <div className="stat-grid">
          {stats.map((item, index) => (
            <div key={index} className="circular-stat">
              <CircularProgressbar
                value={item.percentage}
                text={`${item.percentage}%`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: '#4caf50',
                  textColor: '#333',
                  trailColor: '#e0e0e0',
                })}
              />
              <p>{item.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard from '../../components/home/ProfileCard';
import ExamInfoCard from '../../components/home/ExamInfoCard';
import ProgressCard from '../../components/home/ProgressCard';
import './MyPage.css';


const API_BASE_URL = '/api'; // Nginx 프록시 설정에 따라 변경

const MyPage = () => {
  const user = {
    name: 'User',
    email: 'user@example.com',
    avatar: '/user.png',
  };

  const [analysisData, setAnalysisData] = useState([]);

  const allCombinations = [
    { level: 'N1', problemType: 'V' },
    { level: 'N1', problemType: 'G' },
    { level: 'N1', problemType: 'R' },
    { level: 'N2', problemType: 'V' },
    { level: 'N2', problemType: 'G' },
    { level: 'N2', problemType: 'R' },
    { level: 'N3', problemType: 'V' },
    { level: 'N3', problemType: 'G' },
    { level: 'N3', problemType: 'R' },
  ];

  useEffect(() => {
    const fetchAnalysis = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const res = await axios.get(`${API_BASE_URL}/answer-record/my-analysis`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const rawData = res.data?.data;
        const receivedMap = new Map();

        // 받은 데이터를 key로 저장
        rawData.forEach((group) => {
          const level = group.category;
          group.results.forEach((result) => {
            const key = `${level}_${result.category}`;
            receivedMap.set(key, {
              level: level,
              problemType: result.category,
              wrongRate: result.incorrectRate,
            });
          });
        });

        // 전체 조합을 기준으로 누락된 건 0%로 추가
        const completeData = allCombinations.map(({ level, problemType }) => {
          const key = `${level}_${problemType}`;
          return (
            receivedMap.get(key) || {
              level,
              problemType,
              wrongRate: 0,
            }
          );
        });

        setAnalysisData(completeData);
      } catch (err) {
        console.error('❌ 오답률 데이터 가져오기 실패:', err);
      }
    };

    fetchAnalysis();
  }, []);

  const getSubjectName = (code) => {
    switch (code) {
      case 'V':
        return '어휘';
      case 'G':
        return '문법';
      case 'R':
        return '독해';
      default:
        return code;
    }
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

      <div className="overall-wrongrate-card">
        <div className="card-title-area">
          <h2>📊 전체 오답률</h2>
        </div>

        <div className="progress-grid">
          {analysisData.map((item, idx) => (
            <ProgressCard
              key={idx}
              level={item.level}
              subject={getSubjectName(item.problemType)}
              value={Math.round(item.wrongRate)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPage;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.total || typeof state.correct !== 'number') {
    return <div className="result-page">결과 데이터가 없습니다.</div>;
  }

  const { total, correct } = state;
  const percentage = ((correct / total) * 100).toFixed(1);

  const handleToStart = () => {
    navigate('/generate-problem');
  };

  return (
    <div className="result-page">
      <h2>🎉 문제 풀이 완료!</h2>
      <p>총 {total}문제 중 {correct}문제를 맞혔습니다.</p>
      <p>정답률: <strong>{percentage}%</strong></p>

      <div className="result-buttons">
        <button onClick={handleToStart}>처음으로</button>
      </div>
    </div>
  );
};

export default ResultPage;

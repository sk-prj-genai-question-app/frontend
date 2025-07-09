import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ⛔ 뒤로가기 방지: popstate 감지 시 /generate-problem 으로 이동
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      navigate('/generate-problem', { replace: true });
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  // state가 없으면 직접 접근한 경우 → 되돌리기
  if (!state || !state.total || typeof state.correct !== 'number') {
    return <div className="result-page">결과 데이터가 없습니다.</div>;
  }

  const { total, correct } = state;
  const percentage = ((correct / total) * 100).toFixed(1);

  const handleToStart = () => {
    navigate('/generate-problem', { replace: true }); // 히스토리에 남기지 않음
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

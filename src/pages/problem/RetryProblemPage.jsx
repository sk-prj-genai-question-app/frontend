import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SolveProblemPage.css'; // 기존 스타일 재활용

const RetryProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`/api/problems/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProblem(res.data.data);
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = async () => {
    setShowAnswer(true);
    const isCorrect = selected === problem.answerNumber;

    const token = localStorage.getItem('accessToken');
    await axios.post(
      '/api/answer-record',
      {
        problem_id: problem.id,
        user_answer: selected,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setTimeout(() => {
      navigate('/wrong-note'); // 다시 복습노트로 이동
    }, 2000); // 2초 후 이동
  };

  if (!problem) return <div>문제 불러오는 중...</div>;

  return (
    <div className="solve-problem-page">
      <h2>문제 다시 풀기</h2>
      <p className="problem-count">1 / 1 문제</p> {/* 문제 수는 1로 고정해도 됨 */}
      <div className="problem-container">
        {' '}
        {/* ✅ 이거 새로 추가해야 함 */}
        <p className="problem-level-type">
          [{problem.level}]
          {problem.problemType === 'V' ? '어휘' : problem.problemType === 'G' ? '문법' : '독해'}
        </p>
        <h3 className="problem-title-parent">{problem.problemTitleParent}</h3>
        {problem.problemTitleChild && (
          <p className="problem-title-child">{problem.problemTitleChild}</p>
        )}
        {problem.problemContent && (
          <div className="problem-content">
            <pre>{problem.problemContent}</pre>
          </div>
        )}
        <div className="choices-container">
          {problem.choices.map((choice) => (
            <div
              key={choice.number}
              className={`choice-item ${
                showAnswer
                  ? choice.number === problem.answerNumber
                    ? 'correct'
                    : selected === choice.number
                    ? 'incorrect'
                    : ''
                  : selected === choice.number
                  ? 'selected'
                  : ''
              }`}
              onClick={() => !showAnswer && setSelected(choice.number)}
            >
              <span className="choice-number">{choice.number}.</span> {choice.content}
            </div>
          ))}
        </div>
        {!showAnswer && (
          <button className="submit-button" onClick={handleSubmit} disabled={selected === null}>
            정답 확인
          </button>
        )}
        {showAnswer && (
          <div className="explanation-container">
            <h4>해설</h4>
            <p>{problem.explanation}</p>
            <p>잠시 후 복습노트로 이동합니다...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetryProblemPage;

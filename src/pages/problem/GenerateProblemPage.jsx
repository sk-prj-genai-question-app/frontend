import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GenerateProblemPage.css';

const GenerateProblemPage = () => {
  const [level, setLevel] = useState('');
  const [problemType, setProblemType] = useState('');
  const [numProblems, setNumProblems] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateProblem = async () => {
    const number = parseInt(numProblems, 10);
    if (!level || !problemType || isNaN(number) || number < 1 || number > 10) {
      alert('레벨, 문제 유형, 문제 수를 모두 정확히 입력해주세요. (1~10)');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/problems/generate', {
        level: level,
        problem_type: problemType,
      });

      navigate('/solve-problem', {
        state: {
          problem: response.data.data,
          numProblems: number,
          initialLevel: level,
          initialProblemType: problemType,
        },
      });
    } catch (error) {
      console.error('Error generating problem:', error);
      alert('문제 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumProblemsInput = (e) => {
    const val = e.target.value.trim();

    // 숫자(1~2자리)만 허용
    if (!/^\d{0,2}$/.test(val)) return;

    if (val === '') {
      setNumProblems('');
      return;
    }

    const number = parseInt(val, 10);
    if (number < 1 || number > 10) {
      alert('1에서 10 사이의 숫자만 입력 가능합니다.');
      setNumProblems('');
    } else {
      setNumProblems(number);
    }
  };

  return (
    <div className="generate-problem-page">
      <h2>문제 생성</h2>

      <div className="selection-container">
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">레벨 선택</option>
          <option value="N1">N1</option>
          <option value="N2">N2</option>
          <option value="N3">N3</option>
        </select>

        <select value={problemType} onChange={(e) => setProblemType(e.target.value)}>
          <option value="">문제 유형 선택</option>
          <option value="V">어휘</option>
          <option value="G">문법</option>
          <option value="R">독해</option>
        </select>

        <div className="num-problems-input">
          <label htmlFor="numProblems">문제 수 (1~10): </label>
          <input
            type="text"
            id="numProblems"
            value={numProblems}
            onChange={handleNumProblemsInput}
            placeholder="숫자 입력"
          />
        </div>
      </div>

      <button
        onClick={handleGenerateProblem}
        disabled={!level || !problemType || !numProblems || isLoading}
      >
        문제 생성
      </button>

      {/* ✅ 로딩 오버레이 */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-text">문제를 생성 중입니다...</div>
        </div>
      )}
    </div>
  );
};

export default GenerateProblemPage;

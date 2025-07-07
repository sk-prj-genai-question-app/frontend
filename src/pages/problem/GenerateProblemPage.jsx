import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GenerateProblemPage.css';

const GenerateProblemPage = () => {
  const [level, setLevel] = useState('');
  const [problemType, setProblemType] = useState('');
  const [numProblems, setNumProblems] = useState(1); // New state for number of problems
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateProblem = async () => {
    if (!level || !problemType || numProblems < 1 || numProblems > 10) {
      alert('레벨, 문제 유형, 그리고 풀 문제 수를 1에서 10 사이의 값으로 정확히 선택해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/problems/generate', {
        level: level,
        problem_type: problemType,
      });
      navigate('/solve-problem', {
        state: { problem: response.data.data, numProblems: numProblems, initialLevel: level, initialProblemType: problemType },
      });
    } catch (error) {
      console.error('Error generating problem:', error);
      alert('문제 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
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
        </select>
        <select value={problemType} onChange={(e) => setProblemType(e.target.value)}>
          <option value="">문제 유형 선택</option>
          <option value="V">어휘</option>
          <option value="G">문법</option>
          <option value="R">독해</option>
        </select>
        <div className="num-problems-input">
          <label htmlFor="numProblems">풀 문제 수 (1-10): </label>
          <input
            type="number"
            id="numProblems"
            min="1"
            max="10"
            value={numProblems}
            onChange={(e) => setNumProblems(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>
      <button
        onClick={handleGenerateProblem}
        disabled={!level || !problemType || numProblems < 1 || numProblems > 10 || isLoading}
      >
        {isLoading ? '생성 중...' : '문제 생성'}
      </button>
    </div>
  );
};

export default GenerateProblemPage;

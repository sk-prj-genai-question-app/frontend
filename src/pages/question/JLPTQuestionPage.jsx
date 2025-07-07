import React, { useState } from 'react';
import LevelSelector from '../components/LevelSelector';
import DifficultySelector from '../components/DifficultySelector';
import QuestionDisplay from '../components/QuestionDisplay';
import './JLPTQuestionPage.css';

const JLPTQuestionPage = () => {
  const [level, setLevel] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [question, setQuestion] = useState('');

  const handleGenerateQuestion = async () => {
    if (!level || !difficulty) {
      alert('레벨과 난이도를 모두 선택하세요.');
      return;
    }

    // 👉 여기에 LangGraph 호출 로직을 넣으세요
    const generated = `레벨 ${level}, 난이도 ${difficulty} 문제 예시:\n\n「猫」は英語で何と言いますか？\nA. Dog\nB. Cat\nC. Bird\nD. Fish`;
    setQuestion(generated);
  };

  return (
    <div className="jlpt-container">
      <h2 className="jlpt-title">JLPT 문제 생성기</h2>

      <LevelSelector selected={level} onSelect={setLevel} />
      <DifficultySelector selected={difficulty} onSelect={setDifficulty} />

      <button className="generate-btn" onClick={handleGenerateQuestion}>
        문제 생성
      </button>

      <QuestionDisplay content={question} />
    </div>
  );
};

export default JLPTQuestionPage;

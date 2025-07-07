import React, { useState } from 'react';
import axios from 'axios';

import LevelSelector from '../../components/question/LevelSelector';
import TypeSelector  from '../../components/question/TypeSelector';
import QuestionDisplay from '../../components/question/QuestionDisplay';

import './JLPTQuestionPage.css';

const JLPTQuestionPage = () => {
  /* 선택 옵션 */
  const [level, setLevel]   = useState(null); // N1~N5
  const [type,  setType]    = useState(null); // V/G/R
  const [amount, setAmount] = useState(5);    // 문제 개수

  /* 문제 진행 */
  const [questions, setQuestions] = useState([]);
  const [idx,  setIdx] = useState(0);

  /* 보기·해설 상태 */
  const [showAnswer,      setShowAnswer]      = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  /* --- 문제 가져오기 -------------------------------------------------- */
  const fetchQuestions = async () => {
    const params = { page: 0, size: amount };

    // level / type 둘 중 하나만 전송
    if (level && !type) params.level        = level;
    else if (type && !level) params.problemType = type;
    else if (level && type) params.level = level; // level 우선(임시)

    try {
      const { data } = await axios.get('/api/problems', { params });
      if (data.content?.length) {
        setQuestions(data.content);
        setIdx(0);
        setShowAnswer(false);
        setShowExplanation(false);
      } else {
        alert('해당 조건에 맞는 문제가 없습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('문제 불러오기 실패');
    }
  };

  /* --- 문제 넘기기 ---------------------------------------------------- */
  const nextQuestion = () => {
    if (idx < questions.length - 1) {
      setIdx(prev => prev + 1);
      setShowAnswer(false);
      setShowExplanation(false);
    } else {
      alert('마지막 문제입니다.');
    }
  };

  /* 현재 문제 */
  const current = questions[idx];

  return (
    <div className="jlpt-container">
      {/* 선택 UI -------------------------------------------------------- */}
      <LevelSelector
        selected={level}
        onSelect={(lvl) => { setLevel(lvl); setType(null); }}
      />
      <TypeSelector
        selected={type}
        onSelect={(tp) => { setType(tp); setLevel(null); }}
      />

      <div className="selector-group">
        <h4>문제 개수</h4>
        <select
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="dropdown"
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
            <option key={n} value={n}>{n}개</option>
          ))}
        </select>
      </div>

      <button className="generate-btn" onClick={fetchQuestions}>
        문제 생성
      </button>

      {/* 문제 출력 ------------------------------------------------------ */}
      {current && (
        <>
          <QuestionDisplay
            problem={current}
            selectedAnswer={showAnswer}
            showExplanation={showExplanation}
          />

          <div className="actions">
            {!showAnswer && (
              <button className="generate-btn" onClick={() => setShowAnswer(true)}>
                정답 확인
              </button>
            )}

            {showAnswer && (
              <>
                <button
                  className="generate-btn"
                  onClick={() => setShowExplanation(prev => !prev)}
                >
                  {showExplanation ? '해설 숨기기' : '해설 보기'}
                </button>
                <button className="generate-btn" onClick={nextQuestion}>
                  문제 넘기기
                </button>
              </>
            )}
          </div>

          <p style={{ marginTop: 8 }}>
            ( {idx + 1} / {questions.length} )
          </p>
        </>
      )}
    </div>
  );
};

export default JLPTQuestionPage;


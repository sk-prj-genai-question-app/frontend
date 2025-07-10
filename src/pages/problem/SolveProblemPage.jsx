import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SolveProblemPage.css';

const SolveProblemPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    problem: singleProblem,
    problems: multipleProblems,
    numProblems,
    initialLevel,
    initialProblemType,
  } = location.state || {};

  const [problemHistory, setProblemHistory] = useState(
    multipleProblems?.length > 0 ? multipleProblems : [singleProblem]
  );
  const [currentProblemIndex, setCurrentProblemIndex] = useState(1);
  const [currentProblem, setCurrentProblem] = useState(
    multipleProblems?.length > 0 ? multipleProblems[0] : singleProblem
  );

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoadingNewProblem, setIsLoadingNewProblem] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (!currentProblem) {
      console.error('No initial problem data received.');
      navigate('/');
    }
  }, [currentProblem, navigate]);

  const handleChoiceClick = (choiceNumber) => {
    setSelectedChoice(choiceNumber);
  };

  const handleSubmitAnswer = async () => {
    setShowAnswer(true);
    const isCorrect = selectedChoice === currentProblem.answerNumber;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    try {
      const userId = 1; // ⚠️ 실제 앱에서는 백엔드에서 추출되도록 구현
      const token = localStorage.getItem('accessToken');

      await axios.post(
        '/api/answer-record',
        {
          user_id: userId,
          problem_id: currentProblem.id,
          user_answer: selectedChoice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('문제 풀이 기록 저장 실패', error);
    }
  };

  const handleNextProblem = async () => {
    if (currentProblemIndex < numProblems) {
      setIsLoadingNewProblem(true);
      try {
        let nextProblem;

        if (currentProblemIndex < problemHistory.length) {
          nextProblem = problemHistory[currentProblemIndex];
        } else {
          const response = await axios.post('http://127.0.0.1:8000/problems/generate', {
            level: initialLevel,
            problem_type: initialProblemType,
          });
          nextProblem = response.data.data;
          setProblemHistory((prev) => [...prev, nextProblem]);
        }

        setCurrentProblem(nextProblem);
        setCurrentProblemIndex((prev) => prev + 1);
        setSelectedChoice(null);
        setShowAnswer(false);
      } catch (error) {
        console.error('Error generating next problem:', error);
        alert('다음 문제 생성에 실패했습니다.');
      } finally {
        setIsLoadingNewProblem(false);
      }
    } else {
      navigate('/result', {
        state: {
          total: numProblems,
          correct: correctCount,
        },
        replace: true,
      });
    }
  };

  const handlePreviousProblem = () => {
    if (currentProblemIndex > 1) {
      const previousProblem = problemHistory[currentProblemIndex - 2];
      setCurrentProblem(previousProblem);
      setCurrentProblemIndex((prev) => prev - 1);
      setSelectedChoice(null);
      setShowAnswer(false);
    }
  };

  const getChoiceClass = (choiceNumber) => {
    if (!showAnswer) return selectedChoice === choiceNumber ? 'selected' : '';
    if (choiceNumber === currentProblem.answerNumber) return 'correct';
    if (selectedChoice === choiceNumber && selectedChoice !== currentProblem.answerNumber)
      return 'incorrect';
    return '';
  };

  return (
    <div className="solve-problem-page">
      <h2>문제 풀이</h2>
      <p className="problem-count">
        {currentProblemIndex} / {numProblems} 문제
      </p>
      <div className="problem-container">
        <p className="problem-level-type">
          [{currentProblem.level}]
          {currentProblem.problemType === 'V'
            ? '어휘'
            : currentProblem.problemType === 'G'
            ? '문법'
            : '독해'}
        </p>
        <h3 className="problem-title-parent">{currentProblem.problemTitleParent}</h3>
        {currentProblem.problemTitleChild && (
          <p className="problem-title-child">{currentProblem.problemTitleChild}</p>
        )}
        {currentProblem.problemContent && (
          <div className="problem-content">
            <pre>{currentProblem.problemContent}</pre>
          </div>
        )}

        <div className="choices-container">
          {currentProblem.choices &&
            currentProblem.choices.map((choice) => (
              <div
                key={choice.number}
                className={`choice-item ${getChoiceClass(choice.number)}`}
                onClick={() => !showAnswer && handleChoiceClick(choice.number)}
              >
                <span className="choice-number">{choice.number}.</span> {choice.content}
              </div>
            ))}
        </div>

        {!showAnswer && (
          <button
            className="submit-button"
            onClick={handleSubmitAnswer}
            disabled={selectedChoice === null}
          >
            정답 확인
          </button>
        )}

        {showAnswer && (
          <div className="explanation-container">
            <h4>해설</h4>
            <p>{currentProblem.explanation}</p>
            <div className="navigation-buttons">
              <button
                className="previous-problem-button"
                onClick={handlePreviousProblem}
                disabled={currentProblemIndex === 1}
              >
                이전 문제
              </button>
              <button
                className="next-problem-button"
                onClick={handleNextProblem}
                disabled={isLoadingNewProblem}
              >
                {isLoadingNewProblem
                  ? '생성 중...'
                  : currentProblemIndex < numProblems
                  ? '다음 문제'
                  : '문제 풀기 종료'}
              </button>
            </div>
          </div>
        )}
      </div>

      {isLoadingNewProblem && (
        <div className="loading-overlay">
          <div className="loading-text">다음 문제를 생성 중입니다...</div>
        </div>
      )}
    </div>
  );
};

export default SolveProblemPage;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SolveProblemPage.css';

const SolveProblemPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    problem: initialProblem,
    numProblems,
    initialLevel,
    initialProblemType,
  } = location.state || {};

  const [currentProblem, setCurrentProblem] = useState(initialProblem);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(1);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoadingNewProblem, setIsLoadingNewProblem] = useState(false);
  // New state to store problem history
  const [problemHistory, setProblemHistory] = useState([initialProblem]);

  useEffect(() => {
    if (!initialProblem) {
      console.error('No initial problem data received.');
      navigate('/'); // Redirect to home if no initial problem
    }
  }, [initialProblem, navigate]);

  if (!currentProblem) {
    return <div className="solve-problem-page">문제 데이터를 불러오는 중입니다...</div>;
  }

  const handleChoiceClick = (choiceNumber) => {
    setSelectedChoice(choiceNumber);
  };

  const handleSubmitAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextProblem = async () => {
    if (currentProblemIndex < numProblems) {
      setIsLoadingNewProblem(true);
      try {
        let nextProblem;
        // If we have problems in history beyond current index, use them
        if (currentProblemIndex < problemHistory.length) {
          nextProblem = problemHistory[currentProblemIndex];
        } else {
          // Otherwise, generate a new problem
          const response = await axios.post('http://127.0.0.1:8000/problems/generate', {
            level: initialLevel,
            problem_type: initialProblemType,
          });
          console.log("Received problem data:", response.data.data);
          nextProblem = response.data.data;
          setProblemHistory((prevHistory) => [...prevHistory, nextProblem]);
        }

        setCurrentProblem(nextProblem);
        setCurrentProblemIndex((prevIndex) => prevIndex + 1);
        setSelectedChoice(null);
        setShowAnswer(false);
      } catch (error) {
        console.error('Error generating next problem:', error);
        alert('다음 문제 생성에 실패했습니다.');
      } finally {
        setIsLoadingNewProblem(false);
      }
    } else {
      // End of problems, navigate to home
      navigate('/');
    }
  };

  const handlePreviousProblem = () => {
    if (currentProblemIndex > 1) {
      const previousProblem = problemHistory[currentProblemIndex - 2]; // -2 because index is 1-based and array is 0-based
      setCurrentProblem(previousProblem);
      setCurrentProblemIndex((prevIndex) => prevIndex - 1);
      setSelectedChoice(null);
      setShowAnswer(false);
    }
  };

  const getChoiceClass = (choiceNumber) => {
    if (!showAnswer) {
      return selectedChoice === choiceNumber ? 'selected' : '';
    }
    // 정답 표시 모드
    if (choiceNumber === currentProblem.answerNumber) {
      return 'correct';
    }
    if (selectedChoice === choiceNumber && selectedChoice !== currentProblem.answerNumber) {
      return 'incorrect';
    }
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
          [{currentProblem.level}]{' '}
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
          {currentProblem.choices && currentProblem.choices.map((choice) => (
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
            <div className="navigation-buttons"> {/* New div for navigation buttons */}
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
    </div>
  );
};

export default SolveProblemPage;

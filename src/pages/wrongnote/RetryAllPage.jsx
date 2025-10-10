import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './RetryAllPage.module.css';

const RetryAllPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { problems } = location.state || { problems: [] };

  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentProblem, setCurrentProblem] = useState(problems[0]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [results, setResults] = useState({}); // { questionId: true/false }
  const [isSaving, setIsSaving] = useState(false);

  const handleChoiceClick = (choiceNumber) => {
    setSelectedChoice(choiceNumber);
  };

  const handleSubmitAnswer = () => {
    setShowAnswer(true);
    const isCorrect = selectedChoice === currentProblem.answerNumber;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    setResults((prev) => ({
      ...prev,
      [currentProblem.questionId]: isCorrect,
    }));
  };

  const handleNextProblem = () => {
    if (currentIndex < problems.length) {
      setCurrentProblem(problems[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setShowAnswer(false);
    } else {
      setCurrentIndex((prev) => prev + 1); // 끝 표시용
      setShowAnswer(false);
      setSelectedChoice(null);
    }
  };

  const isFinished = currentIndex > problems.length;

  // 결과가 완료됐을 때 서버 저장 (자동 이동 제거, 저장 상태 표시만)
  useEffect(() => {
    if (isFinished) {
      const saveResultsToServer = async () => {
        setIsSaving(true);
        const token = localStorage.getItem('accessToken');
        try {
          await Promise.all(
            problems.map((p) =>
              axios.post(
                '/api/answer-record',
                {
                  problem_id: p.questionId,
                  user_answer: results[p.questionId] ? p.answerNumber : -1,
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
            )
          );
          alert('결과가 저장되었습니다.');
        } catch (error) {
          console.error('결과 저장 실패:', error);
          alert('결과 저장에 실패했습니다. 다시 시도해주세요.');
        } finally {
          setIsSaving(false);
        }
      };

      saveResultsToServer();
    }
  }, [isFinished, problems, results]);

  const goBackToWrongNote = () => {
    navigate('/wrong-note');
  };

  const getChoiceClass = (choiceNumber) => {
    if (!showAnswer) return selectedChoice === choiceNumber ? styles.selected : '';
    if (choiceNumber === currentProblem.answerNumber) return styles.correct;
    if (selectedChoice === choiceNumber && selectedChoice !== currentProblem.answerNumber)
      return styles.incorrect;
    return '';
  };

  return (
    <div className={styles.retryProblemPage}>
      {!isFinished ? (
        <>
          <h2>다시 풀기</h2>
          <p className={styles.problemCount}>
            {currentIndex} / {problems.length} 문제
          </p>
          <div className={styles.problemContainer}>
            <p className={styles.problemLevelType}>
              [{currentProblem.level}]
              {currentProblem.subject === 'V'
                ? '어휘'
                : currentProblem.subject === 'G'
                ? '문법'
                : '독해'}
            </p>
            <h3 className={styles.problemTitleParent}>{currentProblem.question}</h3>
            {currentProblem.sub_question && (
              <p className={styles.problemTitleChild}>{currentProblem.sub_question}</p>
            )}
            {currentProblem.problm_content && (
              <div className={styles.problemContent}>
                <pre>{currentProblem.problm_content}</pre>
              </div>
            )}

            <div className={styles.choicesContainer}>
              {currentProblem.options &&
                currentProblem.options.map((choice) => (
                  <div
                    key={choice.number}
                    className={`${styles.choiceItem} ${getChoiceClass(choice.number)}`}
                    onClick={() => !showAnswer && handleChoiceClick(choice.number)}
                  >
                    <span className={styles.choiceNumber}>{choice.number}.</span> {choice.content}
                  </div>
                ))}
            </div>

            {!showAnswer && (
              <button
                className={styles.submitButton}
                onClick={handleSubmitAnswer}
                disabled={selectedChoice === null}
              >
                정답 확인
              </button>
            )}

            {showAnswer && (
              <div className={styles.explanationContainer}>
                <h4>해설</h4>
                <p>{currentProblem.explanation}</p>
                <button className={styles.nextProblemButton} onClick={handleNextProblem}>
                  {currentIndex < problems.length ? '다음 문제' : '결과 보기'}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.resultSummary}>
          <h2>풀이 결과</h2>
          {isSaving ? (
            <p>결과 저장 중입니다...</p>
          ) : (
            <>
              <p className={styles.scoreText}>
                맞은 문제 수: {correctCount} / {problems.length}
              </p>
              {/* <ul className={styles.resultList}>
                {problems.map((p, idx) => (
                  <li
                    key={p.questionId}
                    className={
                      results[p.questionId] ? styles.correctResult : styles.incorrectResult
                    }
                  >
                    문제 {idx + 1}: {results[p.questionId] ? "정답" : "오답"}
                  </li>
                ))}
              </ul> */}
              <button className={styles.backButton} onClick={goBackToWrongNote}>
                복습노트로 돌아가기
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RetryAllPage;

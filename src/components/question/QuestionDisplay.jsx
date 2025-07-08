import React from 'react';
import './QuestionDisplay.css';   // ▸ 선택 색상용 (선택 사항)

const QuestionDisplay = ({
  problem,
  selected,
  setSelected,
  showAnswer,
  showExp
}) => {
  if (!problem) return null;

  return (
    <div className="question-box">
      <h3>{problem.problemTitleParent}</h3>
      {problem.problemTitleChild && <h4>{problem.problemTitleChild}</h4>}
      {problem.problemContent && <p>{problem.problemContent}</p>}

      <ol className="choice-list">
        {problem.choices.map((c) => {
          const isChosen  = selected === c.number;
          const isCorrect = showAnswer && c.isCorrect;
          const wrongPick = showAnswer && isChosen && !c.isCorrect;

          return (
            <li key={c.number}>
              <button
                className={
                  'choice-btn' +
                  (isChosen   ? ' chosen'   : '') +
                  (isCorrect  ? ' correct'  : '') +
                  (wrongPick  ? ' wrong'    : '')
                }
                onClick={() => setSelected(c.number)}
                disabled={showAnswer} /* 정답 확인 후 잠금 */
              >
                {c.number}. {c.content}
              </button>
            </li>
          );
        })}
      </ol>

      {showAnswer && showExp && (
        <div className="explanation">
          <strong>해설:</strong> {problem.explanation}
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;

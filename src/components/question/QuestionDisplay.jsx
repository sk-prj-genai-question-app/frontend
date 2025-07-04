import React from 'react';

const QuestionDisplay = ({ content }) => {
  return (
    <div className="question-box">
      {content ? <pre>{content}</pre> : <p>문제를 생성해보세요!</p>}
    </div>
  );
};

export default QuestionDisplay;

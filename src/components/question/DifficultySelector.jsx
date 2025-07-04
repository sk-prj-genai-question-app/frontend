import React from 'react';

const difficulties = ['상', '중', '하'];

const DifficultySelector = ({ selected, onSelect }) => {
  return (
    <div className="selector-group">
      <h4>난이도</h4>
      {difficulties.map((diff) => (
        <button
          key={diff}
          className={`selector-btn ${selected === diff ? 'active' : ''}`}
          onClick={() => onSelect(diff)}
        >
          {diff}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;

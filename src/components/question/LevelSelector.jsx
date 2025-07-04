import React from 'react';

const levels = ['N1', 'N2', 'N3', 'N4', 'N5'];

const LevelSelector = ({ selected, onSelect }) => {
  return (
    <div className="selector-group">
      <h4>JLPT 레벨</h4>
      {levels.map((level) => (
        <button
          key={level}
          className={`selector-btn ${selected === level ? 'active' : ''}`}
          onClick={() => onSelect(level)}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default LevelSelector;

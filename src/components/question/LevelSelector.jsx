import React from 'react';
const levels = ['N1', 'N2', 'N3', 'N4', 'N5'];

const LevelSelector = ({ selected, onSelect }) => (
  <div className="selector-group">
    <h4>JLPT 레벨</h4>
    {levels.map((lv) => (
      <button
        key={lv}
        className={`selector-btn ${selected === lv ? 'active' : ''}`}
        onClick={() => onSelect(lv)}
      >
        {lv}
      </button>
    ))}
  </div>
);
export default LevelSelector;

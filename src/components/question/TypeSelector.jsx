import React from 'react';

const types = [
  { label: '어휘', value: 'V' },
  { label: '문법', value: 'G' },
  { label: '독해', value: 'R' },
];

const TypeSelector = ({ selected, onSelect }) => (
  <div className="selector-group">
    <h4>문제 유형</h4>
    {types.map((type) => (
      <button
        key={type.value}
        className={`selector-btn ${selected === type.value ? 'active' : ''}`}
        onClick={() => onSelect(type.value)}
      >
        {type.label}
      </button>
    ))}
  </div>
);

export default TypeSelector;

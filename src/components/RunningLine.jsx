import React from 'react';

const ITEMS = [
  'branding',
  'packaging',
  'naming',
  'packaging',
  '3d illustration',
  '2d illustration',
  'animation',
  'logo',
  'branding',
  'packaging',
  'naming',
  'packaging',
  '3d illustration',
  '2d illustration',
  'animation',
  'logo'
];

export default function RunningLine() {
  return (
    <div className="running-line">
      <img className="running-line-bg" src="/image/concepts/concept-running-bg.png" alt="running line bg" />
      <div className="running-line-wrapper">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => (
          <span className="running-line-item" key={idx}>
            {item}
            <img className="running-line-dot" src="/image/concepts/concepts-running-dot.png" alt="dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

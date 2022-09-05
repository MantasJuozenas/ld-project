import React from 'react';

function Paragraph({ className = null, text }) {
  return <p className={className}>{text}</p>;
}

export default Paragraph;

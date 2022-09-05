import React from 'react';

function Button({ type = null, text }) {
  return <button type={type}>{text}</button>;
}

export default Button;

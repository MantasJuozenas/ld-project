import React from 'react';

function MessageDiv({ classNameDiv, classNameImg, src, text }) {
  return (
    <div>
      <div className={classNameDiv}>
        <p>{text}</p>
      </div>
      <img className={classNameImg} src={src} alt='clock' />
    </div>
  );
}

export default MessageDiv;

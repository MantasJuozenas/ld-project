import React from 'react';

function Input({ className, type, placeholder, name, onChange, onFocus = null, value, onBlur }) {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      onFocus={onFocus}
      value={value}
      onBlur={onBlur}
    />
  );
}

export default Input;

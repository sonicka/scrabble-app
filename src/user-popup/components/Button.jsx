import React from 'react';

const Button = ({ text, onClick, customClass, disabled }) => (
  <button 
    className={customClass || ''}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
)

export default Button;


import React, { useState, useEffect } from 'react';
import './TextField.css';

const TextField = ({ id, isEditing, originalValue, handleChange, customClass }) => {
  const [ value, setValue ] = useState(originalValue);
  const [ isValid, setIsValid ] = useState(true);

  useEffect(() => {
    if (!isEditing) {
      setValue(originalValue);
      setIsValid(true);
    }
  }, [isEditing]);

  const handleInputChange = (event) => {
    setValue(event.target.value)
    handleChange(event.target.value, isValid);
    setIsValid(!!event.target.value);
  }

  return (
    isEditing ? (
      <input 
        type='text'
        name={id}
        value={value}
        onChange={handleInputChange}  
        className={`text-field ${!isValid ? 'invalid-input' : ''}`}
      /> 
    ) : <div className={customClass}>{value}</div>
  )
}

export default TextField;

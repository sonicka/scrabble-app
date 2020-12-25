

import React, { useState, useEffect } from 'react';
import './TextField.css';

const TextField = ({ id, isEditing, defaultValue, handleChange, customClass }) => {
  const [ value, setValue ] = useState(defaultValue);
  const [ isValid, setIsValid ] = useState(true);

  useEffect(() => {
    if (!isEditing) {
      setValue(defaultValue);
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

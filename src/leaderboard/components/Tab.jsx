

import React from 'react';
import './Tab.css';

const Tab = ({ isActive, onClick, text }) => {
  return (
    <div 
      className={`leader-board-tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
      role='button'>
        {text}
    </div>
  )
}

export default Tab;

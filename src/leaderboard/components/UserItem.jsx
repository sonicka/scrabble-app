

import React from 'react';
import UserStats from '../../components/UserStats';
import './UserItem.css';

const UserItem = ({ wins, averageScore, losses, onClick, name, activeTab }) => {
  return (
    <div className='user-item-wrap' onClick={onClick} role='button'>
        <div className='user-item-name'>{name}</div>
        <UserStats 
          wins={wins} 
          averageScore={averageScore} 
          losses={losses} 
          customClass='user-item-stats'
        />
    </div>
  )
}

export default UserItem;

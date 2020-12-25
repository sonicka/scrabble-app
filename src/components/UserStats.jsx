import React from 'react';

const UserStats = ({ wins, averageScore, losses, customClass }) => {
  return (
    <div className={customClass}>
      <div>{wins} wins</div>
      <div>|</div>
      <div>{averageScore} avg score</div>
      <div>|</div>
      <div>{losses} losses</div>
    </div>
  )
}

export default UserStats;

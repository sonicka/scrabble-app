import React from 'react';
import './HighestScoreSection.css';

const HighestScoreSection = ({ name, won, score, opponent, date }) => (
  <div className='highest-score-wrap'>
    <div className='highest-score-subtitle'>Highest score</div>
    <div>
      <b>{name}</b> {won ? 'won' : 'lost'} with <b>{score} points</b> against <b>{opponent}</b> { date && `on ${date}`}
    </div>
  </div>
)

export default HighestScoreSection;
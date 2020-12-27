import React from 'react';
import Button from './Button';
import { PREV, NEXT } from '../../constants';
import './WonGamesSection.css';

const WonGamesSection = ({ name, game, fetchGameWonByUser, gameIndex, lastIndex }) => {
  const { opponentName, playerScore, opponentScore, date } = game;

  const renderWonGameText = () => (
    <div className='won-games-text'>
      {name} vs. {opponentName} ({playerScore} : {opponentScore}) {date && `on ${new Date(date).toLocaleString()}`}
    </div>
  )

  return (
    <>
      <div className='won-games-title'>Won games</div>
      <div className='won-games-wrap'>
        <div className={gameIndex > 1 ? '' : 'button-hidden'}>
          <Button onClick={() => fetchGameWonByUser(PREV)} text='<'/>
        </div>
        {game && renderWonGameText()}
        <div className={gameIndex < lastIndex ? '' : 'button-hidden'}>
          <Button onClick={() => fetchGameWonByUser(NEXT)} text='>'/>
        </div>
      </div>
    </>
  )
}

export default WonGamesSection;

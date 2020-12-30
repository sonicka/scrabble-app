import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getGamesWonByUser, getUserById } from "../api/fetch";
import UserDetailsSection from './components/UserDetailsSection';
import UserStats from '../components/UserStats';
import HighestScoreSection from './components/HighestScoreSection';
import WonGamesSection from './components/WonGamesSection';
import Button from './components/Button';
import { PREV } from '../constants';
import { setGame, setGameIndex, setLastIndex } from '../actions';
import './UserPopup.css';

const UserPopup = ({ hideUserDetail, user, game, gameIndex, lastIndex, setGame, setGameIndex, setLastIndex }) => {
  const { userId, name, username, email, averageScore, wins, losses, bestGame: { opponentName, date, score, won } } = user;
  let fetchGameWonByUser;

  useEffect(() => {
    const fetchWonGame = async () => await fetchGameWonByUser();
    if (wins) fetchWonGame();
  }, [fetchGameWonByUser, wins]);

  fetchGameWonByUser = async (direction) => {
    let nextIndex = gameIndex;
    if (!direction) setLastIndex(wins < 5 ? wins : 5);
    if (direction) {
      nextIndex = direction === PREV ? gameIndex - 1 : gameIndex + 1;
      setGameIndex(nextIndex)
    }
    let response = await getGamesWonByUser(userId, nextIndex);
    const opponentId = response.game.scores.find(score => score.memberId !== userId).memberId;
    const opponent = await getUserById(opponentId);
    const date = response.game.createdAt || '';
    const playerScore = response.game.scores.find(score => score.memberId === userId)?.score;
    const opponentScore = response.game.scores.find(score => score.memberId === opponentId)?.score;
    const newGame = { opponentName: opponent.name || '', date, playerScore, opponentScore }
    setGame(newGame);
  };

  return (
    <div className='user-popup-wrap'>
      <div className='user-popup-overlay' onClick={hideUserDetail} role='button'/>
          <div className='user-popup'>
          <UserDetailsSection name={name} username={username} email={email} />
          <UserStats wins={wins} averageScore={averageScore} losses={losses} customClass='user-stats'/>
          <HighestScoreSection name={name} won={won} score={score} opponent={opponentName} date={date ? new Date(date).toLocaleString() : ''}/>
          {game && ( 
            <WonGamesSection 
              userId={userId}
              name={name}
              game={game}
              fetchGameWonByUser={fetchGameWonByUser}
              gameIndex={gameIndex}
              lastIndex={lastIndex}/>
          )}
          <Button text='✕' onClick={hideUserDetail} customClass='user-popup-close-btn'/>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const user = state.user;
  const { game, gameIndex, lastIndex } = state.wonGame;
  return {
    user, 
    game, 
    gameIndex, 
    lastIndex
  };
};

const mapDispatchToProps = {
  setGame,
  setGameIndex,
  setLastIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPopup);


import React from 'react';
import { connect } from "react-redux";
import UserItem from './components/UserItem';
import { MOST_WINS_TAB, AVG_SCORE_TAB } from '../constants';
import { setActiveTab, saveUser } from '../actions';
import { getGameWithHighestScore, getUserById } from '../api/fetch';
import './LeaderBoard.css';

const LeaderBoard = ({ users, activeTab, setActiveTab, saveUser }) => {
  const saveUserWithMoreDetails =  async (user) => {
    const { userId, highestScore: { against, score } } = user;
    const bestGameResponse =  await getGameWithHighestScore(userId, against, score);
    if (!bestGameResponse) return user;
    const opponent = await getUserById(against);
    const bestGame = {
      opponentName: opponent.name, 
      opponentId: opponent.id, 
      won: bestGameResponse.winnerId === userId, 
      score, 
      date: bestGameResponse.createdAt
    };
    saveUser({ ...user, bestGame })
  }

  return (
    <div className='leader-board-wrap'>
        <div className='leader-board-tabs'>
          <div 
            className={`leader-board-tab ${activeTab === MOST_WINS_TAB ? 'active' : ''}`}
            onClick={() => setActiveTab(MOST_WINS_TAB)}
            role='button'>
              Most wins
          </div>
          <div 
            className={`leader-board-tab ${activeTab === AVG_SCORE_TAB ? 'active' : ''}`}
            onClick={() => setActiveTab(AVG_SCORE_TAB)}
            role='button'>
              Average score
          </div>
        </div>
        <div className='leader-board-users-list'>
          {users && users.map(user => (
             <UserItem key={user.userId} {...user} onClick={() => saveUserWithMoreDetails(user)} activeTab={activeTab}/>
          )
        )}
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const activeTab = state.activeTab;
  const users = state.activeTab === MOST_WINS_TAB ? state.usersByWins : state.usersByScore;
  return {
    activeTab,
    users,
  };
};

const mapDispatchToProps = {
  setActiveTab,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);

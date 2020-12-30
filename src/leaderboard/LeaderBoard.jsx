
import React from 'react';
import { connect } from "react-redux";
import UserItem from './components/UserItem';
import Tab from './components/Tab';
import { getGameWithHighestScore, getUserById } from '../api/fetch';
import { setActiveTab, saveUser } from '../actions';
import { MOST_WINS_TAB, AVG_SCORE_TAB } from '../constants';
import './LeaderBoard.css';

const LeaderBoard = ({ users, activeTab, setActiveTab, saveUser }) => {
  const saveUserWithGameDetails =  async (user) => {
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

  const renderLeaderBoard = () => users.map(user => 
    <UserItem 
      key={user.userId} 
      name={user.name}
      wins={user.wins}
      averageScore={user.averageScore}
      losses={user.losses}
      onClick={() => saveUserWithGameDetails(user)} />
  )

  const renderErrorMessage = () => <div className='leader-board-error'>Players could not be loaded, please try again later.</div>

  return (
    <div className='leader-board-wrap'>
        <div className='leader-board-tabs'>
          <Tab isActive={activeTab === MOST_WINS_TAB} onClick={() => setActiveTab(MOST_WINS_TAB)} text='Most wins' />
          <Tab isActive={activeTab === AVG_SCORE_TAB} onClick={() => setActiveTab(AVG_SCORE_TAB)} text='Average score' />
        </div>
        <div className='leader-board-users-list'>
          {users ? renderLeaderBoard() : renderErrorMessage()}
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

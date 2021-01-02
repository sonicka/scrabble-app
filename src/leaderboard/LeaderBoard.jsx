
import React from 'react';
import { connect } from "react-redux";
import UserItem from './components/UserItem';
import Tab from './components/Tab';
import Spinner from './components/Spinner';
import { getBestGame, getUserById } from '../api/fetch';
import { setActiveTab, saveUser } from '../actions';
import { MOST_WINS_TAB, AVG_SCORE_TAB, USERS_BY_WINS, USERS_BY_SCORE } from '../constants';
import './LeaderBoard.css';

const LeaderBoard = ({ users, activeTab, setActiveTab, saveUser, isLoading }) => {
  const saveUserWithGameDetails =  async (user) => {
    const { userId, highestScore: { against, score } } = user;
    const bestGameResponse =  await getBestGame(userId, score);
    if (!bestGameResponse) return;
    const opponent = await getUserById(against);
    if (opponent) {
      const bestGame = {
        opponentName: opponent.name, 
        opponentId: opponent.id, 
        won: bestGameResponse.winnerId === userId, 
        score, 
        date: bestGameResponse.createdAt
      };
      saveUser({ ...user, bestGame })
    }
  }

  const switchTab = (tab) => {
    if (tab !== activeTab) setActiveTab(tab);
  }

  const renderLoader = () => <Spinner />

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

  const renderUsersSection = () => {
    if (users?.length) return renderLeaderBoard();
    return renderErrorMessage();
  }

  return (
    <div className='leader-board-wrap'>
        <div className='leader-board-tabs'>
          <Tab isActive={activeTab === MOST_WINS_TAB} onClick={() => switchTab(MOST_WINS_TAB)} text='Most wins' />
          <Tab isActive={activeTab === AVG_SCORE_TAB} onClick={() => switchTab(AVG_SCORE_TAB)} text='Average score' />
        </div>
        <div className='leader-board-users-list'>
          {isLoading ? renderLoader() : renderUsersSection()}
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const activeTab = state.activeTab;
  const isLoading =  state.activeTab === MOST_WINS_TAB ? state.isLoading[USERS_BY_WINS] : state.isLoading[USERS_BY_SCORE];
  const users = state.activeTab === MOST_WINS_TAB ? state.usersByWins : state.usersByScore;
  return {
    activeTab,
    isLoading,
    users,
  };
};

const mapDispatchToProps = {
  setActiveTab,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);

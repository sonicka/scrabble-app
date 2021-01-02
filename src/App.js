import React, { useEffect } from "react";
import { connect } from "react-redux";
import LeaderBoard from "./leaderboard/LeaderBoard";
import UserPopup from "./user-popup/UserPopup";
import {
  getLeaderBoardByAvgScore,
  getLeaderBoardByWins,
  getUserById,
} from "./api/fetch";
import {
  saveUsersByWins,
  saveUsersByScore,
  clearUser,
  resetWonGame,
  setShouldLoadUsers,
  setIsLoading,
} from "./actions";
import "./App.css";
import { USERS_BY_WINS, USERS_BY_SCORE } from "./constants";

const App = ({
  saveUsersByWins,
  saveUsersByScore,
  clearUser,
  resetWonGame,
  setShouldLoadUsers,
  detailShown,
  shouldLoadUsers,
  setIsLoading,
}) => {
  let loadUsersByWins;
  let loadUsersByScore;

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      await loadUsersByWins();
      setIsLoading(USERS_BY_WINS, false);
      await loadUsersByScore();
      setIsLoading(USERS_BY_SCORE, false);
    };
    setShouldLoadUsers(false);
    if (shouldLoadUsers) {
      setIsLoading(USERS_BY_WINS, true);
      setIsLoading(USERS_BY_SCORE, true);
      fetchLeaderBoard();
    }
  }, [
    shouldLoadUsers,
    loadUsersByWins,
    loadUsersByScore,
    setShouldLoadUsers,
    setIsLoading,
  ]);

  loadUsersByWins = async () => {
    const usersByWins = await getLeaderBoardByWins();
    if (!usersByWins) {
      saveUsersByWins(usersByWins);
      return;
    }
    let updatedUsers = [];
    for (let user of usersByWins) {
      const updatedUser = await getUserDetails(user);
      if (updatedUser) updatedUsers.push(updatedUser);
    }
    saveUsersByWins(updatedUsers);
  };

  loadUsersByScore = async () => {
    const usersByScore = await getLeaderBoardByAvgScore();
    if (!usersByScore) {
      saveUsersByScore(usersByScore);
      return;
    }
    let updatedUsers = [];
    for (let user of usersByScore) {
      const updatedUser = await getUserDetails(user);
      if (updatedUser) updatedUsers.push(updatedUser);
    }
    saveUsersByScore(updatedUsers);
  };

  const getUserDetails = async (user) => {
    const userDetails = await getUserById(user.userId);
    if (userDetails) {
      const userWithDetails = { ...user, ...userDetails };
      return userWithDetails;
    }
    return null;
  };

  const hideUserDetail = () => {
    clearUser();
    resetWonGame();
  };

  return (
    <div className={`app ${detailShown ? "no-scroll" : ""}`}>
      <LeaderBoard />
      {detailShown && <UserPopup hideUserDetail={hideUserDetail} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  const detailShown = !!state.user;
  const shouldLoadUsers = state.shouldLoadUsers;
  return {
    detailShown,
    shouldLoadUsers,
  };
};

const mapDispatchToProps = {
  saveUsersByWins,
  saveUsersByScore,
  clearUser,
  resetWonGame,
  setShouldLoadUsers,
  setIsLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

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
} from "./actions";
import "./App.css";

const App = ({
  saveUsersByWins,
  saveUsersByScore,
  clearUser,
  resetWonGame,
  setShouldLoadUsers,
  detailShown,
  shouldLoadUsers,
}) => {
  let loadUsersByWins;
  let loadUsersByScore;

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      await loadUsersByWins();
      await loadUsersByScore();
      setShouldLoadUsers(false);
    };
    if (shouldLoadUsers) {
      fetchLeaderBoard();
    }
    // }, [shouldLoadUsers]);
  }, [shouldLoadUsers, loadUsersByWins, loadUsersByScore, setShouldLoadUsers]);

  loadUsersByWins = async () => {
    const usersByWins = await getLeaderBoardByWins();
    if (!usersByWins) {
      saveUsersByWins(usersByWins);
      return;
    }
    let updatedUsers = [];
    for (let user of usersByWins) {
      const updatedUser = await getUserDetails(user);
      updatedUsers.push(updatedUser);
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
      updatedUsers.push(updatedUser);
    }
    saveUsersByScore(updatedUsers);
  };

  const getUserDetails = async (user) => {
    const userDetails = await getUserById(user.userId);
    const userWithDetails = { ...user, ...userDetails };
    return userWithDetails;
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

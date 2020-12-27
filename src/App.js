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
  setUserUpdated,
} from "./actions";
import "./App.css";

const App = ({
  saveUsersByWins,
  saveUsersByScore,
  clearUser,
  resetWonGame,
  setUserUpdated,
  detailShown,
  userUpdated,
}) => {
  useEffect(() => {
    const fetchLeaderBoard = async () => {
      await loadUsersByWins();
      await loadUsersByScore();
    };

    fetchLeaderBoard();
  }, []);

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      await loadUsersByWins();
      await loadUsersByScore();
      setUserUpdated(false);
    };

    if (userUpdated) {
      fetchLeaderBoard();
    }
  }, [userUpdated]);

  const loadUsersByWins = async () => {
    const usersByWins = await getLeaderBoardByWins();
    if (usersByWins) {
      let updatedUsers = [];
      for (let user of usersByWins) {
        const updatedUser = await getUserDetails(user);
        updatedUsers.push(updatedUser);
      }
      saveUsersByWins(updatedUsers);
    }
  };

  const loadUsersByScore = async () => {
    const usersByScore = await getLeaderBoardByAvgScore();
    if (usersByScore) {
      let updatedUsers = [];
      for (let user of usersByScore) {
        const updatedUser = await getUserDetails(user);
        updatedUsers.push(updatedUser);
      }
      saveUsersByScore(updatedUsers);
    }
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
  const userUpdated = state.userUpdated;
  return {
    detailShown,
    userUpdated,
  };
};

const mapDispatchToProps = {
  saveUsersByWins,
  saveUsersByScore,
  clearUser,
  resetWonGame,
  setUserUpdated,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
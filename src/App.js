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
  saveUser,
  clearUser,
  setUserUpdated,
  resetGame,
} from "./actions";
import "./App.css";

const App = ({
  saveUsersByWins,
  saveUsersByScore,
  clearUser,
  detailShown,
  userUpdated,
  setUserUpdated,
  resetGame,
}) => {
  useEffect(() => {
    const fetchLeaderBoard = async () => {
      await loadUsersByScore();
      await loadUsersByWins();
    };

    fetchLeaderBoard();
  }, []);

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      await loadUsersByScore();
      await loadUsersByWins();
      setUserUpdated(false);
    };

    if (userUpdated) {
      fetchLeaderBoard();
    }
  }, [userUpdated]);

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

  const getUserDetails = async (user) => {
    const userDetails = await getUserById(user.userId);
    const userWithDetails = { ...user, ...userDetails };
    return userWithDetails;
  };

  const hideUserDetail = () => {
    clearUser();
    resetGame();
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
  saveUser,
  clearUser,
  setUserUpdated,
  resetGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

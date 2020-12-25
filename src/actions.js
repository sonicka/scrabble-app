import {
  SAVE_USER,
  SAVE_USERS_BY_SCORE,
  SAVE_USERS_BY_WINS,
  SET_ACTIVE_TAB,
  CLEAR_USER,
  SET_USER_UPDATED,
  SET_GAME,
  SET_GAME_INDEX,
  SET_LAST_INDEX,
  RESET_WON_GAME,
} from "./constants";

export function saveUsersByWins(users) {
  return (dispatch) => {
    dispatch({
      type: SAVE_USERS_BY_WINS,
      payload: { users },
    });
  };
}

export function saveUsersByScore(users) {
  return (dispatch) => {
    dispatch({
      type: SAVE_USERS_BY_SCORE,
      payload: { users },
    });
  };
}

export function saveUser(user) {
  return (dispatch) => {
    dispatch({
      type: SAVE_USER,
      payload: { user },
    });
  };
}

export function clearUser() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_USER,
    });
  };
}

export function setUserUpdated(isUpdated) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_UPDATED,
      payload: isUpdated,
    });
  };
}

export function setActiveTab(activeTab) {
  return (dispatch) => {
    dispatch({
      type: SET_ACTIVE_TAB,
      payload: { activeTab },
    });
  };
}

export function setGame(game) {
  return (dispatch) => {
    dispatch({
      type: SET_GAME,
      payload: { game },
    });
  };
}

export function setGameIndex(gameIndex) {
  return (dispatch) => {
    dispatch({
      type: SET_GAME_INDEX,
      payload: { gameIndex },
    });
  };
}

export function setLastIndex(lastIndex) {
  return (dispatch) => {
    dispatch({
      type: SET_LAST_INDEX,
      payload: { lastIndex },
    });
  };
}

export function resetGame() {
  return (dispatch) => {
    dispatch({
      type: RESET_WON_GAME,
    });
  };
}

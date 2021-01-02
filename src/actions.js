import {
  SAVE_USERS_BY_WINS,
  SAVE_USERS_BY_SCORE,
  SAVE_USER,
  CLEAR_USER,
  SET_SHOULD_LOAD_USERS,
  SET_ACTIVE_TAB,
  SET_GAME_INDEX,
  SET_LAST_INDEX,
  SET_GAME,
  RESET_WON_GAME,
  SET_IS_LOADING,
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

export function setShouldLoadUsers(isUpdated) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOULD_LOAD_USERS,
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

export function setGame(game) {
  return (dispatch) => {
    dispatch({
      type: SET_GAME,
      payload: { game },
    });
  };
}

export function resetWonGame() {
  return (dispatch) => {
    dispatch({
      type: RESET_WON_GAME,
    });
  };
}

export function setIsLoading(key, isLoading) {
  return (dispatch) => {
    dispatch({
      type: SET_IS_LOADING,
      payload: {
        key,
        isLoading,
      },
    });
  };
}

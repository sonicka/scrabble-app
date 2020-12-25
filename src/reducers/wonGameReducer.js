import {
  SET_GAME,
  SET_GAME_INDEX,
  SET_LAST_INDEX,
  RESET_WON_GAME,
} from "../constants";

const initialState = {
  game: null,
  gameIndex: 1,
  lastIndex: 5,
};

export const wonGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME:
      return { ...state, game: action.payload.game };
    case SET_GAME_INDEX:
      return { ...state, gameIndex: action.payload.gameIndex };
    case SET_LAST_INDEX:
      return { ...state, lastIndex: action.payload.lastIndex };
    case RESET_WON_GAME:
      return initialState;
    default:
      return state;
  }
};

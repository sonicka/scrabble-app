import { SAVE_USERS_BY_SCORE } from "../constants";

export const usersByScoreReducer = (state = [], action) => {
  switch (action.type) {
    case SAVE_USERS_BY_SCORE:
      return action.payload.users;
    default:
      return state;
  }
};

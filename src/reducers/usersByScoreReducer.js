import * as actions from "../constants";

export const usersByScoreReducer = (state = [], action) => {
  switch (action.type) {
    case actions.SAVE_USERS_BY_SCORE:
      return action.payload.users;
    default:
      return state;
  }
};

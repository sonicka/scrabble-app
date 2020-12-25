import * as actions from "../constants";

export const usersByWinsReducer = (state = [], action) => {
  switch (action.type) {
    case actions.SAVE_USERS_BY_WINS:
      return action.payload.users;
    default:
      return state;
  }
};

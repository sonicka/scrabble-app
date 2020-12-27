import { SAVE_USERS_BY_WINS } from "../constants";

export const usersByWinsReducer = (state = [], action) => {
  switch (action.type) {
    case SAVE_USERS_BY_WINS:
      return action.payload.users;
    default:
      return state;
  }
};

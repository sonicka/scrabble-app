import { SET_SHOULD_LOAD_USERS } from "../constants";

export const shouldLoadUsersReducer = (state = true, action) => {
  switch (action.type) {
    case SET_SHOULD_LOAD_USERS:
      return action.payload;
    default:
      return state;
  }
};

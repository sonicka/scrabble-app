import { SET_USER_UPDATED } from "../constants";

export const userUpdatedReducer = (state = false, action) => {
  switch (action.type) {
    case SET_USER_UPDATED:
      return action.payload;
    default:
      return state;
  }
};

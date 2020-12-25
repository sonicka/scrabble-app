import * as actions from "../constants";

export const userUpdatedReducer = (state = false, action) => {
  switch (action.type) {
    case actions.SET_USER_UPDATED:
      return action.payload;
    default:
      return state;
  }
};

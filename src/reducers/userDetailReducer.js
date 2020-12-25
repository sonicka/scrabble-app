import * as actions from "../constants";

export const userDetailReducer = (state = null, action) => {
  switch (action.type) {
    case actions.SAVE_USER:
      return {
        ...state,
        ...action.payload.user,
      };
    case actions.CLEAR_USER:
      return null;
    default:
      return state;
  }
};

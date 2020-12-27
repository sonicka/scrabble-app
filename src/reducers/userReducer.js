import { SAVE_USER, CLEAR_USER } from "../constants";

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        ...action.payload.user,
      };
    case CLEAR_USER:
      return null;
    default:
      return state;
  }
};

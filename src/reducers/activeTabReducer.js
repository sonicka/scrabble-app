import { SET_ACTIVE_TAB, MOST_WINS_TAB } from "../constants";

export const activeTabReducer = (state = MOST_WINS_TAB, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return action.payload.activeTab;
    default:
      return state;
  }
};

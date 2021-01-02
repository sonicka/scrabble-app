import { SET_IS_LOADING, USERS_BY_WINS, USERS_BY_SCORE } from "../constants";

const initialState = {
  [USERS_BY_WINS]: false,
  [USERS_BY_SCORE]: false,
};

export const isLoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        [action.payload.key]: action.payload.isLoading,
      };
    default:
      return state;
  }
};

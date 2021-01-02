import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { usersByScoreReducer } from "./reducers/usersByScoreReducer";
import { usersByWinsReducer } from "./reducers/usersByWinsReducer";
import { userReducer } from "./reducers/userReducer";
import { activeTabReducer } from "./reducers/activeTabReducer";
import { shouldLoadUsersReducer } from "./reducers/shouldLoadUsersReducer";
import { wonGameReducer } from "./reducers/wonGameReducer";
import { isLoadingReducer } from "./reducers/isLoadingReducer";

export const rootReducer = combineReducers({
  usersByScore: usersByScoreReducer,
  usersByWins: usersByWinsReducer,
  user: userReducer,
  activeTab: activeTabReducer,
  shouldLoadUsers: shouldLoadUsersReducer,
  wonGame: wonGameReducer,
  isLoading: isLoadingReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

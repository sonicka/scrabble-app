import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { usersByScoreReducer } from "./reducers/usersByScoreReducer";
import { usersByWinsReducer } from "./reducers/usersByWinsReducer";
import { userDetailReducer } from "./reducers/userDetailReducer";
import { activeTabReducer } from "./reducers/activeTabReducer";
import { userUpdatedReducer } from "./reducers/userUpdatedReducer";
import { wonGameReducer } from "./reducers/wonGameReducer";

export const rootReducer = combineReducers({
  usersByScore: usersByScoreReducer,
  usersByWins: usersByWinsReducer,
  user: userDetailReducer,
  activeTab: activeTabReducer,
  userUpdated: userUpdatedReducer,
  wonGame: wonGameReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

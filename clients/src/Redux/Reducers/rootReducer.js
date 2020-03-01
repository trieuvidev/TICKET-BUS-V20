import {combineReducers} from "redux";
import authReducer from "./User";
import adminReducer from "./Admin";

const rootReducers = combineReducers({
  authReducer, adminReducer
});

export default rootReducers;
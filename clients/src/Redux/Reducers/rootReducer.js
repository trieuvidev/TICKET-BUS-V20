import {combineReducers} from "redux";
import authReducer from "./Authenticate";
import adminReducer from "./Admin";

const rootReducers = combineReducers({
  authReducer, adminReducer
});

export default rootReducers;
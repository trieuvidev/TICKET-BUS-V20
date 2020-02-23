import {combineReducers} from "redux";
import authReducer from "./User";

const rootReducers = combineReducers({
  authReducer
});

export default rootReducers;
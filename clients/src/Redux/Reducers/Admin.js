import _ from "lodash";
import * as Types from "../../constants/actionTypes";

const initialState = { 
    isCollapsed: false
}

const adminReducer = (state = initialState, action) => { 
  switch (action.type) {
    case Types.OPEN_COLLAPSED_ADMIN:
      return { 
        ...state,
        isCollapsed: !state.isCollapsed
      }
    default:
      break;
  }
  return state;
};

export default adminReducer;
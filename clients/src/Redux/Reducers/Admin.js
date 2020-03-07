import * as Types from "../../constants/actionTypes";

const initialState = { 
    isCollapsed: false,
    listUsers: []
}

const adminReducer = (state = initialState, action) => { 
  switch (action.type) {
    case Types.OPEN_COLLAPSED_ADMIN:
      return { 
        ...state,
        isCollapsed: !state.isCollapsed
      }
      case Types.LIST_USERS:
        console.log(action)
        return { 
          ...state,
          listUsers: action.listUsers
        }
    default:
      break;
  }
  return state;
};

export default adminReducer;
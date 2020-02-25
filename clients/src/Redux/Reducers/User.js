import * as Types from "../../constants/actionTypes";


const initialState = {
  isAuthenticate: false,
  account: {},
}

/** ------------------Auth User---------------------------
 * 
--------------------------------------------------------**/
const authReducer = (state = initialState, action) => { 
 switch (action.type) {
   case Types.SET_INFO_CURRENT_USER:
     return { 
       ...state,
       isAuthenticate: true,
       account: action.access_token
     }
   default:
     break;
 }
 return state;
};

export default authReducer;
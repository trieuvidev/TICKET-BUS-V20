import * as Types from "../../constants/actionTypes";
import api from "../../Services/Api";
import jwtDecoded from "jwt-decode";
import {setInfoCurrentUser} from "./Authenticate";
import setTokenHeaders from "../../Services/SetHeaderToken";

export const loginAdminApi = (credentials) => { 
  return dispatch => { 
   return api.post("/account/login-admin", credentials)
    .then(res => { 
      const access_token = res.data[0].generateToken;
      const decode = jwtDecoded(access_token);
      dispatch(setInfoCurrentUser(decode));
      localStorage.setItem("ACCESS_TOKEN", access_token)
      setTokenHeaders(access_token);
       return Promise.resolve({status: 200, message: `Đăng nhâp nhập thành công!`})
    })
    .catch(console.log)
  }
};


export const listUsersApi = () => {
  return dispatch => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      return api
        .get("/accounts")
        .then(result => {
          const listUsers = result.data[0].accounts;
          dispatch(listUserAction(listUsers))
          return listUsers;
        })
        .catch(console.log);
    }
    return false;
  };
};


export const openCollapsed = () => { 
  return (dispatch) => { 
    dispatch({
      type: Types.OPEN_COLLAPSED_ADMIN
    })
  }
};

export const listUserAction = (listUsers) => { 
  return dispatch => { 
    dispatch({
      type: Types.LIST_USERS,
      listUsers : listUsers
    })
  }
}

export const logoutAdminApi = () => { 
  return dispatch => {
    localStorage.removeItem("ACCESS_TOKEN");
    dispatch(setInfoCurrentUser({}))
  }
}





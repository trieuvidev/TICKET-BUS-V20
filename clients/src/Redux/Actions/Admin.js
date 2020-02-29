import * as Types from "../../constants/actionTypes";
import api from "../../Services/Api";
import jwtDecoded from "jwt-decode";
import {setInfoCurrentUser} from "./User";

export const loginAdminApi = (credentials) => { 
  return dispatch => { 
   return api.post("/account/login-admin", credentials)
    .then(res => { 
      const access_token = res.data[0].token;
      const decode = jwtDecoded(access_token);
      dispatch(setInfoCurrentUser(decode));
      localStorage.setItem("ACCESS_TOKEN", access_token)
       return Promise.resolve({status: 200, message: `Đăng nhâp nhập thành công!`})
    })
    .catch(console.log)
  }
};

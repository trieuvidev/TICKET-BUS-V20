import * as Types from "../../constants/actionTypes";
import api from "../../Services/Api";
import jwtDecoded from "jwt-decode";

/** ----------------------------------
 * @param {*} credentials (email , password)
 -----------------------------------**/
export const loginUserApi = credentials => {
  return dispatch => {
    return api
      .post("/account/login-user", credentials)
      .then(res => {
        const access_token = res.data[0].token;
        const status = res.status;
        const decode = jwtDecoded(access_token);
        dispatch(setInfoCurrentUser(decode));
        localStorage.setItem("ACCESS_TOKEN", access_token);
        return Promise.resolve({status, decode , message: `Đăng nhập ${decode.email} thành công!`})
      })
      .catch(() => {
        return Promise.reject({ message: "Đăng nhập thất bại!" });
      });
  };
};


export const logoutUser = () => { 
  return dispatch => { 
    localStorage.removeItem("ACCESS_TOKEN");
    dispatch(setInfoCurrentUser({}))
  }
};

export const setInfoCurrentUser = access_token => {
  return dispatch => {
    dispatch({
      type: Types.SET_INFO_CURRENT_USER,
      access_token: access_token,
    });
  };
};

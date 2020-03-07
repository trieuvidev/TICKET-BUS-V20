import * as Types from "../../constants/actionTypes";
import api from "../../Services/Api";
import jwtDecoded from "jwt-decode";
import setTokenHeaders from "../../Services/SetHeaderToken";

/** ----------------------------------
 * @param {*} credentials (email , password)
 -----------------------------------**/
export const loginUserApi = credentials => {
  return dispatch => {
    return api
      .post("/account/login-user", credentials)
      .then(res => {
        console.log(typeof res.data);
        const access_token = res.data[0].token;
        const status = res.status;
        const decode = jwtDecoded(access_token);
        const email = decode.email;
        dispatch(setInfoCurrentUser(decode));
        localStorage.setItem("ACCESS_TOKEN", access_token);
        setTokenHeaders(access_token);

        return Promise.resolve({
          status: status,
          message: `Đăng nhâp nhập ${email} thành công!`
        });
      })
      .catch(() => {
        return Promise.reject({
          status: 404,
          message: "Email hoặc mật khẩu không đúng!"
        });
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem("ACCESS_TOKEN");
    dispatch(setInfoCurrentUser({}));
  };
};

export const setInfoCurrentUser = access_token => {
  return dispatch => {
    dispatch({
      type: Types.SET_INFO_CURRENT_USER,
      access_token: access_token
    });
  };
};

import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Menu.css";
import Login from "../../User/Modal/Login";
import {connect} from "react-redux";
import * as actions from "../../../Redux/Actions/index";


class Menu extends Component {

  render() {
    const {showModalLogin} = this.props;
    return (
      <Fragment>
        <section className="header">
          <div className="container warpper">
            <div className="container-fluid header__top ">
              <div className="row header__center">
                <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 header__left">
                  <div className="top__bar__logo">
                    <img
                      src={require("../../../dist/img/logo_vexere.svg")}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 header__center">
                  <div className="menu__top">
                    <ul className="navbar">
                      <li className="nav-item">
                        <a className="home">Trang Chủ</a>
                      </li>
                      <li className="nav-item">
                        <a className="trips">Chuyến Đi</a>
                      </li>
                      <li className="nav-item">
                        <a className="news">Tin Tức</a>
                      </li>
                      <li className="nav-item">
                        <a className="check__ticket">Kiểm Tra Vé</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 header__right">
                  <div className="login__signup">
                    <div className="login">
                      
                   <button onClick={this.onModalLogin} data-toggle="modal" data-target="#modal-login" className="btn__login">Đăng Nhập</button> : 
                    </div>
                    <div className="signup">
                      <button  className="btn__signup">Đăng Ký</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal Login User*/}
          <Login />
          {/* Modal Login User*/}
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showModalLogin : state.showModalLogin
  }
};

const mapDispatchToProps = (dispatch, props) => { 
  return {
    onModalLogin: () => {
      dispatch(actions.showFormLogin())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

import React, { Component, Fragment } from "react";
import "./MenuHeader.css";
import "antd/dist/antd.css";
import {
  Menu,
  Icon,
  Button,
  Dropdown,
  Modal,
  Form,
  Input,
  Checkbox
} from "antd";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/User";
const { SubMenu } = Menu;

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowNameBtn: "Đăng Nhập",
      visible: false,
      email: "",
      password: ""
    };
  }

  onModalLogin = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleSubmitForm = async event => {
    event.preventDefault();
    const { email, password } = this.state;
   await this.props
      .loginUser({ email, password })
      .then(result => {
        console.log(result);
      })
      .catch(console.log);
     await  this.handleCancel();
  };

  handleLogoutUser = () => { 
    this.props.logoutUser()
  }

  handleOnchange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link>Thông Tin Cá Nhân</Link>
        </Menu.Item>
        <Menu.Item>
          <Link onClick={this.handleLogoutUser}>Đăng Xuất</Link>
        </Menu.Item>
      </Menu>
    );

    const { infoAccountLogin } = this.props;
    const { isAuthenticate, account } = infoAccountLogin;
    console.log(isAuthenticate)
    const { visible, email, password } = this.state;
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
                    {!isAuthenticate ? (
                      <div className="login">
                        <button
                          onClick={this.onModalLogin}
                          data-toggle="modal"
                          data-target="#modal-login"
                          className="btn__login"
                        >
                          {this.state.isShowNameBtn}
                        </button>
                      </div>
                    ) : (
                      <div className="login__success">
                        <Dropdown overlay={menu} placement="bottomRight">
                          <Button className="btn__loginSuccess">
                            {account.fullName}
                          </Button>
                        </Dropdown>
                      </div>
                    )}
                    {isAuthenticate ? (
                      ""
                    ) : (
                      <div className="signup">
                        <button className="btn__signup">Đăng Ký</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*-------------------- Modal Login User -----------------------*/}
          <Modal
            title="ĐĂNG NHẬP"
            visible={visible}
            onCancel={this.handleCancel}
            onOpenModal={this.onOpenModal}
            footer={null}
          >
            <Form onSubmit={this.handleSubmitForm} className="login-form">
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleOnchange}
              />
              ,
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={password}
                onChange={this.handleOnchange}
              />
              ,
              <Form.Item>
                <Checkbox>Nhớ mật khẩu</Checkbox>
                <a className="login-form-forgot" href="">
                  Quên mật khẩu
                </a>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Đăng Nhập
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          {/* Modal Login User*/}
        </section>
      </Fragment>
    );  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginUser: credentials => dispatch(actions.loginUserApi(credentials)),
    logoutUser : () => dispatch(actions.logoutUser())
  };
};

export default connect(null, mapDispatchToProps)(MenuHeader);

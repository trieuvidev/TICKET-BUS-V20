import React, { Component, Fragment } from "react";
import "../../assets/css/user.css";
import "antd/dist/antd.css";
import {
  Menu,
  Icon,
  Button,
  Dropdown,
  Modal,
  Form,
  Input,
  Checkbox,
  Avatar
} from "antd";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import * as actions from "../../Redux/Actions/User";
// import Loader from "../Loader";
const { SubMenu } = Menu;

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowNameBtn: "Đăng Nhập",
      visible: false,
      isShowLoader: true
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


  handelSubmitForm = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props
      .loginUser({ email, password })
      .then(res => {
        console.log(res)
        if(res.status === 200) {
          setTimeout(() => {
            this.setState({
              visible: !this.state.visible
            })
          }, 1500);
        }
      })
      .catch(console.log);
  };

  handleOnchange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  handelLogoutUser = () => { 
    this.props.logoutUser();
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link>Profile</Link>
        </Menu.Item>
        <Menu.Item>
          <Link onClick={this.handleLogoutUser}>Logout</Link>
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
          <div className="warpper">
            <div className="container-fluid header__top ">
              <div className="row header__center">
                <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 header__left">
                  <div className="top__bar__logo">
                    <img
                      src={require("../../dist/img/logo_vexere.svg")}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8 col-xl-8 header__center">
                  <div className="menu__top">
                    <ul className="navbar">
                      <li className="nav-item">
                        <a className="home">HOME</a>
                      </li>
                      <li className="nav-item">
                        <a className="trips">TRIP</a>
                      </li>
                      <li className="nav-item">
                        <a className="news">NEW</a>
                      </li>
                      <li className="nav-item">
                        <a className="check__ticket">CHECK TICKET</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 header__right">
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
                      <Avatar className="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <span className="name__user">{account.fullName}</span>
                          </Button>
                        </Dropdown>
                      </div>
                    )}
                    {isAuthenticate ? (
                      ""
                    ) : (
                      <div className="signup">
                        <button className="btn__signup">Sign Up</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*-------------------- Modal Login User -----------------------*/}
          <Modal
            title="LOGIN"
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
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleOnchange}
              />
              ,
              <Form.Item>
                <Checkbox>Remember me</Checkbox>
                <a className="login-form-forgot" href="">
                Forgot password
                </a>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Submit
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
  }
};

export default connect(null, mapDispatchToProps)(MenuHeader);

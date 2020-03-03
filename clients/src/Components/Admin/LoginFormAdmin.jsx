import React, { Component, Fragment } from "react";
import { Icon, Form, Checkbox, Button, Input, Spin } from "antd";
import "../../assets/css/admin.css";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/Admin";
import Loader from "../User/Loader";
import { withRouter } from "react-router-dom";

class LoginFormAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowLoader: true
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount = () => { 
    this.setTimeLoader = setTimeout(() => {
     this.setState({
       isShowLoader: !this.state.isShowLoader
     })
    }, 1500);
  }

  componentWillUnmount = () => { 
    clearTimeout(this.setTimeLoader)
  }

  handleOnLogin = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.loginAdmin({ email, password })
    .then(res => {
      if(this.props.authenticate.isAuthenticate && this.props.authenticate.account.accountType === "admin" ) {
        return this.props.history.push("/admin/dashboard");
      }
      return false;
    })
    .catch()
  };

  render() {
    const { email, password, isShowLoader } = this.state;
    return (
      <Fragment>
        {
          isShowLoader ? <Loader /> : <div className="app__login__admin">
          <Form onSubmit={this.handleOnLogin} className="login-form">
            <div className="header__form__admin">
              <img src={require("../../assets/img/logo-admin.svg")} alt="" />
              <h3 className="title__admin">VEXERE</h3>
            </div>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleOnChange}
              />
              ,
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleOnChange}
              />
              ,
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        }
      </Fragment>
    );
  }
};



const mapStateToProps = state => {
  return {
    authenticate: state.authReducer,
    isLoader: state.loaderReducer 
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginAdmin: credentials => dispatch(actions.loginAdminApi(credentials)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginFormAdmin));

import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./Login.css";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/User";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handelChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handelSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.loginUser({ email, password });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Fragment>
        <div
          className="modal fade"
          id="modal-login"
          role="dialog"
          aria-labelledby="modal-login"
          aria-hidden="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  <span className="title__login">Đăng Nhập</span>
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Form onSubmit={this.handelSubmit} className="login-form">
                  <Form.Item>
                    <Input
                      style={{ height: "40px" }}
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Email"
                      onChange={this.handelChange}
                      name="email"
                      value={email}
                    />
                    ,
                  </Form.Item>
                  <Form.Item>
                    <Input
                      style={{ height: "40px" }}
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      onChange={this.handelChange}
                      name="password"
                      value={password}
                    />
                    ,
                  </Form.Item>
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
                      ĐĂNG NHẬP
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button className="button__login__google">
                      <Icon style={{ fontSize: "20px" }} type="google" />
                      ĐĂNG NHẬP GOOGLE
                    </Button>
                    <Button className="button__login__facebook">
                      <Icon style={{ fontSize: "20px" }} type="facebook" />
                      ĐĂNG NHẬP FACEBOOK
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// const mapStateToProps = props => {
//   return {};
// };

const mapDispatchToProps = dispatch => {
  return {
    loginUser: credentials => {
      dispatch(actions.loginUserApi(credentials));
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);

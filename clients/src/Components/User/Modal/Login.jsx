import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./Login.css";
import 'antd/dist/antd.css';

class Login extends Component {
  render() {
    return (
      <Fragment>
        <div className="modal fade" id="modal-login" role="dialog" aria-labelledby="modal-login" aria-hidden="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><span className="title__login">Đăng Nhập</span></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Form onSubmit={this.onSubmit} className="login-form">
                                <Form.Item>
                                    <Input
                                        style={{ height: "40px" }}
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Email"
                                        name="email"
                                    />,
        </Form.Item>
                                <Form.Item>
                                    <Input
                                        style={{ height: "40px" }}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                    />,
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
                                    <Button className="btn__login__google"><Icon style={{ fontSize: "20px" }} type="google" />ĐĂNG NHẬP GOOGLE</Button>
                                    <Button className="btn__login__facebook"><Icon style={{ fontSize: "20px" }} type="facebook" />ĐĂNG NHẬP FACEBOOK</Button>
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

export default Login;

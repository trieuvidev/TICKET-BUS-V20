import React, { Component, Fragment } from "react";
import "./MenuHeader.css";
import 'antd/dist/antd.css';
import { Menu, Icon, Button, Dropdown, Modal, Form, Input, Checkbox } from "antd";
const { SubMenu } = Menu;

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowNameBtn: "Đăng Nhập",
      visible: false,
      confirmLoading: false
    };
  }

  onModalLogin = () => { 
    this.setState({
      visible: true
    })
  }

  handleCancel = () => { 
    this.setState({
      visible: false
    })
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a>Thông Tin Cá Nhân</a>
        </Menu.Item>
        <Menu.Item>
          <a>Đăng Xuất</a>
        </Menu.Item>
      </Menu>
    );

    const { infoAccountLogin } = this.props;
    const { isAuthenticate, account } = infoAccountLogin;
    const  {visible , confirmLoading } = this.state;
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
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          onOpenModal={this.onOpenModal}
          footer={null}
        >
          <Form className="login-form">
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Mật khẩu"
            />,
        <Form.Item>
          <Checkbox>Nhớ mật khẩu</Checkbox>
          <a className="login-form-forgot" href="">
            Quên mật khẩu
          </a>
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
           Đăng Nhập
          </Button>
          </Form.Item>
      </Form>
        </Modal>
          {/* Modal Login User*/}
        </section>
      </Fragment>
    );
  }
}


export default MenuHeader;

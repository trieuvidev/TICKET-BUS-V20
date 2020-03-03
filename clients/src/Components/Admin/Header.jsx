import React, { Component, Fragment } from "react";
import { Layout, Button, Menu, Dropdown, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/Admin";
import { Link } from "react-router-dom";
import Loader from "../../Components/User/Loader";
import "../../assets/css/stylePage.css";
const { Header } = Layout;

class HeaderSidebar extends Component {
  constructor(props) {
    super(props);
  }

  toggleOpenCollapsed = () => {
    this.props.showCollapsed();
  };

  logoutAdmin = () => {
    this.props.logoutAccountAdmin();
  };

  render() {
    const { account } = this.props.account;
    const menu = (
      <Menu>
        <Menu.Item>
          <a>Profile</a>
        </Menu.Item>
        <Menu.Item>
          <Link className="logout" onClick={this.logoutAdmin}>
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Fragment>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="btn__left">
            <Button
              className="btn__collapsed"
              onClick={this.toggleOpenCollapsed}
            >
              {React.createElement(
                this.props.collapse.isCollapsed
                  ? MenuUnfoldOutlined
                  : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle
                }
              )}
            </Button>
          </div>
          {/* <div className="btn__right-ring">
            <div className="btn__right-info">
              <BellOutlined className="icon__bell" />
            </div>
          </div> */}
          <div className="btn__right">
            <div className="btn__right-info">
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <Dropdown overlay={menu} placement="topRight">
                <span className="btn__right-name">{account.fullName}</span>
              </Dropdown>
            </div>
          </div>
        </Header>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    collapse: state.adminReducer,
    account: state.authReducer
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    showCollapsed: () => dispatch(actions.openCollapsed()),
    logoutAccountAdmin: () => dispatch(actions.logoutAdminApi())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSidebar);

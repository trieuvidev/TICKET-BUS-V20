import React, { Component, Fragment } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from "@ant-design/icons";
import "../../assets/css/stylePage.css";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "../../assets/css/stylePage.css";
const { Sider } = Layout;

class Sidebar extends Component {
  render() {
    return (
      <Fragment>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.props.collapse.isCollapsed}
        >
          <div className="logo">
            <img src={require("../../assets/img/logo-admin.svg")} alt="" />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <UserOutlined />
              <span>Dashboards</span>
              <Link className="menu__dashboard" to="/admin/dashboard">
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span>Users</span>
              <Link className="menu__users" to="/admin/users">
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>Trips</span>
              <Link></Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    collapse: state.adminReducer
  };
};

export default connect(mapStateToProps, null)(Sidebar);

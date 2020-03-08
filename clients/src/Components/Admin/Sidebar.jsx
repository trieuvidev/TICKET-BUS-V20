import React, { Component, Fragment } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  RocketOutlined,
  EnvironmentOutlined,
  PicRightOutlined,
  BarChartOutlined,
  SettingOutlined,
  ShoppingCartOutlined
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
              <DashboardOutlined />
              <span>Dashboards</span>
              <Link className="menu__dashboard" to="/admin/dashboard"></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <UserOutlined />
              <span>Users</span>
              <Link className="menu__users" to="/admin/users"></Link>
            </Menu.Item>
            <Menu.Item key="3">
            <EnvironmentOutlined />
              <span>Trips</span>
              <Link></Link>
            </Menu.Item>
            <Menu.Item key="4">
              <RocketOutlined />
              <span>Stations</span>
              <Link></Link>
            </Menu.Item>
            <Menu.Item key="5">
            <PicRightOutlined />
              <span>Posts</span>
              <Link></Link>
            </Menu.Item>
            <Menu.Item key="6">
            <BarChartOutlined />
              <span>Charts</span>
              <Link></Link>
            </Menu.Item>
            <Menu.Item key="7">
            <SettingOutlined />
              <span>Setting</span>
              <Link></Link>
            </Menu.Item>
            <Menu.Item key="8">
            <ShoppingCartOutlined />
              <span>Tickets</span>
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

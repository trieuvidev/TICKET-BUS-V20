import React, { Component, Fragment } from "react";
import MenuAdmin from "../../../Components/Admin/Menu/MenuAdmin";
import GuardAuthenticate from "../../../Guard/GuardAuthenticate";
import jwtDecoded from "jwt-decode";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/User";
import Loader from "../../../Components/User/Loader/Loader";
import { Layout, Menu, Button } from 'antd';
import '../../../assets/css/stylePage.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';



const { Header, Footer, Sider, Content } = Layout;

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowloader: true,
      collapsed: false
    };
  }

  componentDidMount = () => {
    const access_token = localStorage.getItem("ACCESS_TOKEN");
    if(!access_token) {
      return false;
    }
    const decoded = jwtDecoded(access_token);
    if (
      decoded.exp > new Date().getTime() / 1000 &&
      decoded.accountType === "admin"
    ) {
      this.props.setCurrentAccount(decoded);
    }
    this.setTime = setTimeout(() => {
      this.setState({
        isShowloader: !this.state.isShowloader
      });
    }, 2000);
  };

  componentWillUnmount() {
    clearTimeout(this.setTime);
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.isShowloader ? (
          <Loader />
        ) : (
          <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
          <img src={require("../../../assets/img/logo-admin.svg")} alt=""/>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <UserOutlined />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button type="primary" onClick={this.toggleCollapsed}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
        </Button>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setCurrentAccount: access_token =>
      dispatch(actions.setInfoCurrentUser(access_token))
  };
};

export default connect(null, mapDispatchToProps)(GuardAuthenticate(HomeAdmin));

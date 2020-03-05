import React, { Component, Fragment } from "react";
import GuardAuthenticate from "../../../Guard/GuardAuthenticate";
import jwtDecoded from "jwt-decode";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/User";
import Loader from "../../../Components/User/Loader";
import { Layout } from "antd";
import "../../../assets/css/stylePage.css";

import Header from "../../../Components/Admin/Header";
import Sidebar from "../../../Components/Admin/Sidebar";
import FooterAdmin from "../../../Components/Admin/Footer";
import { BrowserRouter, Switch, Route, withRouter  } from "react-router-dom";
import routes from "../../../routes/menuRoutes";
const { Content } = Layout;

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowloader: true
    };
  }

  showContentRoutes = routes => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        console.log(route)
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          );
      });
    }
    return result;
  };

  checkRoutes = (routes) => { 
    let result = null;
    if(routes.length > 0) { 
      result = routes.map((route, index) =>{ 
        if(route.path === "/admin/users") { 
          return this.props.history.push("/admin/dashboard")
        }
        return false;
      })
    }
    return result;
  }

  componentDidMount = () => {
    const access_token = localStorage.getItem("ACCESS_TOKEN");
    if (!access_token) {
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

// loading checkroutes
this.checkRoutes(routes)
};

  componentWillUnmount() {
    clearTimeout(this.setTime);
  }

  render() {
    return (
      <Fragment>
        <BrowserRouter>
        
        {this.state.isShowloader ? (
          <Loader />
        ) : (
          <Layout>

            <Sidebar />

            <Layout className="site-layout">

              <Header />
              <Content
            className="site-layout-background-content"
          >
            <Switch>
              {this.showContentRoutes(routes)}
              </Switch>
          </Content>
          <FooterAdmin />
            </Layout>

          </Layout>
        )}
        </BrowserRouter>
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

export default withRouter(connect(null, mapDispatchToProps)(GuardAuthenticate(HomeAdmin)));

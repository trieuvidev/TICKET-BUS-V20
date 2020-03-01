import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import * as actions from "../Redux/Actions/Admin";
import { connect } from "react-redux";
import jwtDecoded from "jwt-decode";


const checkTokenLoginAdmin = () => {
  const access_token = localStorage.getItem("ACCESS_TOKEN");
  if(!access_token) {
    return false;
  }
  const decoded = jwtDecoded(access_token);
  if (decoded.accountType === "client") return false;
  if (decoded.exp < new Date().getTime() / 1000) return false;
  return true;
};


export default function(ComposedComponent) {
  class GuardAuthenticate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticate: {}
      };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
      if (nextProps.authenticate.isAuthenticate !== prevState.authenticate.isAuthenticate && !checkTokenLoginAdmin()) {
        if (!nextProps.authenticate.isAuthenticate) {
          nextProps.history.push("/administrator");
        } 
        return {
          authenticate: nextProps.authenticate
        };
      }
    };

    render() {
      console.log({ ...this.props });
      return (
        <Fragment>
          <ComposedComponent {...this.props} />
        </Fragment>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      authenticate: state.authReducer
    };
  };

  return withRouter(connect(mapStateToProps, null)(GuardAuthenticate));
}

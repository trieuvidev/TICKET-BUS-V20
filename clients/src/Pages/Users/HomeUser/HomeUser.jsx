import React, { Component, Fragment } from "react";
import MenuHeader from "../../../Components/User/MenuHeader";
import Search from "../../../Components/User/Search";
import Loader from "../../../Components/User/Loader";
import HomeBody from "../../../Components/User/HomeBody";
import { connect } from "react-redux";
import jwtDecoded from "jwt-decode";
import * as actions from "../../../Redux/Actions/Authenticate";

class HomeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLoader: true
    };
  }

  componentDidMount() {
    this.setTime = setTimeout(() => {
      this.setState({
        isShowLoader: !this.state.isShowLoader
      });
    }, 2000);
    /** get localStore */
    const access_token = localStorage.getItem("ACCESS_TOKEN");
    if(access_token) {
      const decoded = jwtDecoded(access_token);
      if(decoded.exp > new Date().getTime() / 1000 && decoded.accountType === "client") {
        this.props.setCurrentAccount(decoded);
      }
    }
  }
  
  componentWillUnmount() {
    clearTimeout(this.setTime);
  }

  render() {
    const {authenticate} = this.props;
    return (
      <Fragment>
        {this.state.isShowLoader ? (
          <Loader />
        ) : (
          <div className="wrapper">
            <MenuHeader infoAccountLogin={authenticate} />
            <Search />
            <HomeBody />
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { 
    authenticate : state.authReducer
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return { 
    setCurrentAccount : (access_token) => {
      return dispatch(actions.setInfoCurrentUser(access_token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUser);

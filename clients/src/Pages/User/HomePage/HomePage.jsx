import React, { Component, Fragment } from "react";
import MenuHeader from "../../../Components/User/Menu/MenuHeader";
import Search from "../../../Components/User/Search/Search";
import Loader from "../../../Components/User/Loader/Loader";
import { connect } from "react-redux";
import jwtDecoded from "jwt-decode";
import * as actions from "../../../Redux/Actions/User";

class HomePage extends Component {
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
      console.log(decoded)
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

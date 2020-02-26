import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/style.css";
import Loader from "../../../Components/User/Loader/Loader";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLoader: true
    };
  }

  componentDidMount = () => {
    this.setTime = setTimeout(() => {
      this.setState({
        isShowLoader: !this.state.isShowLoader
      });
    }, 1500);
  };

  componentWillUnmount() {
    this.setTime();
  }

  render() {
    return (
      <Fragment>
        {this.state.isShowLoader ? (
          <Loader />
        ) : (
          <div className="not__found">
            <div className="notfound">
              <div className="notfound-404">
                <h1>Oops!</h1>
              </div>
              <h2>404 - Page not found</h2>
              <p>
                The page you are looking for might have been removed had its
                name changed or is temporarily unavailable.
              </p>
              <Link to="/">Go to HomePage</Link>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default NotFound;

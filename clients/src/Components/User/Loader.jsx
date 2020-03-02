import React, { Component, Fragment } from "react";
import "../../assets/css/user.css";

class Loader extends Component {
  render() {
    return (
      <Fragment>
        <div class="pixel-spinner">
          <div class="pixel-spinner-inner"></div>
        </div>
      </Fragment>
    );
  }
}

export default Loader;

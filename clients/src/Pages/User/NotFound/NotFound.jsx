import React, { Component } from 'react';
import "../../../assets/css/style.css"
import {Link} from "react-router-dom";


class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="not__found">
    <div className="notfound">
      <div className="notfound-404">
        <h1>Oops!</h1>
      </div>
      <h2>404 - Page not found</h2>
      <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
    <Link to="/">Go to HomePage</Link>
    </div>
  </div>
      </div>
    );
  }
}

export default NotFound;

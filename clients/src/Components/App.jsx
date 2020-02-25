import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../Routes/Routes";
import HomePage from "../Pages/User/HomePage/HomePage";

class App extends Component {
  showContentRoutes = routes => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        console.log(route, index)
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

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>{this.showContentRoutes(routes)}</Switch>
        </Router>
      </div>
    );
  }
}

export default App;

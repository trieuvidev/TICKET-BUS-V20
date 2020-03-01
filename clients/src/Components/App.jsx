import React, { Component } from "react";
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import routes from "../routes/routes";
class App extends Component {
  showContentRoutes = routes => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
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
      <BrowserRouter >
          <Switch>{this.showContentRoutes(routes)}</Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;

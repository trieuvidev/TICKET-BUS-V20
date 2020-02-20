import React, { Component, Fragment } from "react";
import Menu from "../../../Components/User/Menu/Menu";
import Search from "../../../Components/User/Search/Search";
import Loader from "../../../Components/User/Loader/Loader";

class HomePageUser extends Component {
  constructor(props) {
    super(props);
      (this.state = {
        isShowLoader: true
      })
  }

  componentDidMount() {
    this.setTime = setTimeout(() => {
      this.setState({
        isShowLoader: !this.state.isShowLoader
      });
    }, 2000);
    console.log(this.state)
  }

// sau khi render ra xong thì set lai time
  componentWillUnmount() { 
    clearTimeout(this.setTime);
  }

  render() {
    console.log("render")
    return (
      <Fragment>
        {this.state.isShowLoader ? (
          <Loader />
        ) : (
          <div className="wrapper">
            <Menu />
            <Search />
          </div>
        )}
      </Fragment>
    );
  }
}

export default HomePageUser;

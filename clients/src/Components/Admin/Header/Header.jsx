import React, { Component, Fragment } from "react";
import { Layout, Button, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/Admin";
import "../../../assets/css/stylePage.css";
const { Header } = Layout;

class HeaderSidebar extends Component {
  constructor(props) {
    super(props);
  }

  toggleOpenCollapsed = () => {
    this.props.showCollapsed();
  };

  render() {
    return (
      <Fragment>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button className="btn__collapsed" onClick={this.toggleOpenCollapsed}>
            {React.createElement(
              this.props.collapse.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle
              }
            )}
          </Button>
        </Header>
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => { 
  return { 
    collapse: state.adminReducer
  }
}

const mapDispatchToProps = (dispatch, props) => { 
  return{ 
    showCollapsed: () => dispatch(actions.openCollapsed())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderSidebar);

import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { Tag } from "antd";
import User from "./User";
import { connect } from "react-redux";
import { Skeleton } from 'antd';
// import Loader from "../../Components/User/Loader";
import GuardAuthenticate from "../../Guard/GuardAuthenticate";
import * as actions from "../../Redux/Actions/Admin";

const columns = [
  {
    title: "Avatar",
    width: 100,
    dataIndex: "avatar",
    id: "avatar",
    fixed: "left"
  },
  { title: "Full Name", dataIndex: "fullName", id: "1" },
  { title: "Address", dataIndex: "address", id: "3" },
  { title: "Age", dataIndex: "age", id: "4" },
  { title: "Email", dataIndex: "email", id: "5" },
  { title: "Phone", dataIndex: "phone", id: "6" },
  { title: "User Type", dataIndex: "accountType", id: "7" },
  { title: "Create Time", dataIndex: "createdAt", id: "8" },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <Fragment>Action</Fragment>
  }
];

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      isShowLoader: true
    };
  }

  componentDidMount = () => {
    this.setTimeLoader = setTimeout(() => {
      this.setState({
        isShowLoader: !this.state.isShowLoader
      });
    }, 1000);
    this.props.getListUser(); 
  };

  componentWillUnmount() {
    clearTimeout(this.setTimeLoader);
  }

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { data } = this.props;
    const { listUsers } = data;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <Fragment>
        {/* <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div> */}
        {this.state.isShowLoader ? (
          <Skeleton paragraph={{ rows: 10 }} />
        ) : (
          <User
            rowSelection={rowSelection}
            columns={columns}
            dataSource={listUsers}
            scroll={{ x: 1300 }}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.adminReducer
  };
};

const mapDispathToProps = (dispatch, props) => {
  return {
    getListUser: () => dispatch(actions.listUsersApi())
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withRouter(GuardAuthenticate(ListUsers)));

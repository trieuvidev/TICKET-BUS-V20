import React, { Component, Fragment } from "react";
import { Table } from "antd";

class User extends Component {
  render() {
    return (
      <Fragment>
        <Table
          rowSelection={this.props.rowSelection}
          columns={this.props.columns}
          dataSource={this.props.dataSource}
        />
      </Fragment>
    );
  }
}

export default User;

import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Table, Button } from "antd";
import User from "./User";

const columns = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  }
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    email: `dangtrieuvi18091996@mail.com`,
    address: `London, Park Lane no. ${i}`,
  });
}

class ListUsers extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      selectedRowKeys: []
    }
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  

  render() {
    const {selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <Fragment>
       <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <User rowSelection={rowSelection} columns={columns} dataSource={data} />
        </Fragment>
    );
  }
};

export default withRouter(ListUsers);
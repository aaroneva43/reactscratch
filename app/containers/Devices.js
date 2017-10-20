import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import { Table, Icon } from 'antd';


const Devices = (props) => {

    // const { } = props


    return (

        <div>
            <Table
                rowSelection={{
                    type: 'checkbox'
                }}

                columns={
                    [{
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                        render: text => <a href="#">{text}</a>,
                    }, {
                        title: 'Age',
                        dataIndex: 'age',
                        key: 'age',
                    }, {
                        title: 'Address',
                        dataIndex: 'address',
                        key: 'address',
                    }, {
                        title: 'Action',
                        key: 'action',
                        render: (text, record) => (
                            <span>
                                <a href="#">Action 一 {record.name}</a>
                                <span className="ant-divider" />
                                <a href="#">Delete</a>
                                <span className="ant-divider" />
                                <a href="#" className="ant-dropdown-link">
                                    More actions <Icon type="down" />
                                </a>
                            </span>
                        ),
                    }]
                }
                dataSource={
                    [{
                        key: '1',
                        name: 'John Brown',
                        age: 32,
                        address: 'New York No. 1 Lake Park',
                    }, {
                        key: '2',
                        name: 'Jim Green',
                        age: 42,
                        address: 'London No. 1 Lake Park',
                    }, {
                        key: '3',
                        name: 'Joe Black',
                        age: 32,
                        address: 'Sidney No. 1 Lake Park',
                    }]
                } />
        </div>
    )
}


export default connect(
    // props -> states
    (state) => {
        const { isFetching } = state.posts || {}
        return {
            isFetching: !!isFetching
        }
    }
)(Devices)






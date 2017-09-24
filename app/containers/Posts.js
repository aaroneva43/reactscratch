import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import PostList from '../components/PostList'

import { Modal, DatePicker } from 'antd';


class Posts extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    state = {
        modal_visible: false,
        modal2_visible: false
    }

    handleOk(e) {
        this.setState({
            modal_visible: false,
        });
    }


    handleOk2() {
        this.setState({
            modal2_visible: false,
        });
    }



    render() {
        const { posts, isFetching } = this.props

        return (

            <div>
                <button onClick={() => { this.props.dispatch({ type: 'REQUEST_POSTS', payload: '' }) }}>load posts</button>
                <button onClick={() => { this.setState({ modal_visible: true }) }}>show modal</button>
                <DatePicker />
                <a hidden={!isFetching}>loading...</a>
                <PostList posts={posts}></PostList>

                <Modal
                    title="Basic Modal"
                    visible={this.state.modal_visible}
                    onOk={this.handleOk.bind(this)}
                >
                    <p>Modal 1</p>
                    <button onClick={() => { this.setState({ modal2_visible: true }) }}> show l2 modal</button>

                    <Modal
                        title="Basic Modal"
                        visible={this.state.modal2_visible}
                        onOk={this.handleOk2.bind(this)}
                    >
                        <p>Modal 2</p>
                        <p>Modal 2</p><p>Modal 2</p>
                        <p>Modal 2</p><p>Modal 2</p>
                    </Modal>
                </Modal>
            </div>
        )
    }
}


export default connect((state) => {
    const { items, isFetching } = state.posts || {}
    return {
        posts: items || [],
        isFetching: !!isFetching
    }
})(Posts)
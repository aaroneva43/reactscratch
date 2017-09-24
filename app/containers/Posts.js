import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import {PostList} from '../components/PostList'
class Posts extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    render() {
        const { posts, isFetching } = this.props

        return (

            <div>
                <button onClick={this.props.dispatch({ type: 'REQUEST', payload: '' })}>load posts</button>
                <a hidden={!isFetching}>loading...</a>
                <PostList posts={posts}></PostList>
            </div>
        )
    }
}


export default connect((state) => {
    const {posts, isFetching, dispatch} = state
    return {
        posts: posts || [],
        isFetching: !!isFetching,
        dispatch: dispatch
    }
 }, () => ({}))(Posts)
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import PostList from '../components/PostList'
export default class Posts extends Comment {
    static PropTypes = {
        posts : PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired
    }

    render () {
        const {posts, isFetching} = this.props

        return (

            <div>
                <a hidden={!isFetching}>loading...</a>
                <PostList posts={posts}></PostList>
            </div>
        )
    }
}
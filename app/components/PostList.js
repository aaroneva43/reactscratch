import React, { Component } from 'react'

import PropTypes from 'prop-types'

export default class PostList extends Component{
    static PropTypes = {
        posts: PropTypes.array.isRequired
    }
    render() {

        const { posts } = this.props
        return (<ul>
            {posts.map((post, i) =>
                <li key={i}>{post.title}</li>
            )}
        </ul>)
    }
}





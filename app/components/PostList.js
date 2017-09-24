import React from 'react'
import PropTypes from 'prop-types'

const PostList = ({posts}) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i}>{post.title}</li>
    )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostList

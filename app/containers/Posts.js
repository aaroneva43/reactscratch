import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { posts as postsAction } from '../actions'

import PostList from '../components/PostList'


class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(postsAction.requestPosts())
  }


  // handleRefreshClick = e => {
  //   e.preventDefault()

  //   const { dispatch, selectedReddit } = this.props
  //   dispatch(invalidateReddit(selectedReddit))
  //   dispatch(fetchPostsIfNeeded(selectedReddit))
  // }

  render() {
    const { posts, isFetching } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <button onClick={() => {
          this.props.dispatch(postsAction.requestPosts())
        }}>Refresh</button>

        {/* <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p> */}
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <PostList posts={posts} />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {

  const { isFetching, items } = state.posts || {
    isFetching: true,
    items: []
  }

  return {
    posts: items,
    isFetching
  }
}

export default connect(mapStateToProps)(Posts)
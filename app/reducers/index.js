import { combineReducers } from 'redux'

import { INVALIDATE_POSTS, REQUEST_POSTS, RECEIVE_POSTS, REQUEST_FAILED } from '../actions'

const posts = (
    state = {
        isFetching: false,
        items: []

    }, action) => {
    switch (action.type) {
        case INVALIDATE_POSTS:
            return {
                ...state,
                didInvalidate: true
            }
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            }
        case REQUEST_FAILED:
            return {
                ...state,
                isFetching: false,
                didInvalidate: true,
                items: [],
                msg: action.msg
            }
        default:
            return state
    }
}

export default combineReducers({
    posts
})
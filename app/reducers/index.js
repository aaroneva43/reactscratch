import { combineReducers } from 'redux'

const posts = (
    state = {
        isFetching: false,
        items: []

    }, action) => {
    switch (action.type) {
        case INVALIDATE_REDDIT:
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
        default:
            return state
    }
}

export default combineReducers({
    posts
})
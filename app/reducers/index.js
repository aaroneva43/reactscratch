import { combineReducers } from 'redux'

import {
    SELECT_REDDIT, INVALIDATE_POSTS,
    REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'



const counter = (state = { count: 10 }, action) => {
    const count = state.count
    switch (action.type) {
        case 'numchange':
            return action.payload == 'increase' ? { count: count + 1 } : { count: count - 1 }
        default:
            return state
    }
}

const posts = (state = {
    isFetching: false,
    didInvalidate: false,
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
                didInvalidate: false,
                items: []
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    counter,
    posts
})

export default rootReducer
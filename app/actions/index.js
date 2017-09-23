export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_REDDIT = 'INVALIDATE_POSTS'

export const appActions = {
    getNumAction: (text) => {
        return { type: 'numchange', payload: text == 'Increase' ? 'increase' : 'decrease' }
    }
}

const doRequest = url => dispatch => {
    return fetch(url)
        .then(response => response.json())
        .then(json => dispatch(posts.receivePosts(json)))
}

export const posts = {
    requestPosts: (params) => (dispatch, getState) => {

        dispatch({
            type: REQUEST_POSTS,
            payload: ''
        })

        return dispatch(doRequest(`https://jsonplaceholder.typicode.com/posts`))
    },

    receivePosts: (json) => ({
        type: RECEIVE_POSTS,
        posts: json
    })
} 
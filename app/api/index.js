export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_REDDIT = 'INVALIDATE_POSTS'


const doRequest = url => dispatch => {
    return fetch(url)
        .then(response => response.json())
        .then(json => dispatch(posts.receivePosts(json)))
}

 const posts = {
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

const API = {}

API.fetch = (
    entity = 'posts',
    params = '',
    url = 'https://jsonplaceholder.typicode.com/posts'
) => {
    return fetch(url + '/' + params)
        .then(response => response.json())
}

export default API
import { takeLatest, delay, END } from 'redux-saga'
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects'
import Api from '../api/'

function* fetchPosts(action) {
    try {
        const posts = yield call((Api.fetch), action.payload);
        yield put({ type: "RECEIVE_POSTS", posts: posts });
    } catch (e) {
        yield put({ type: "REQUEST_FAILED", message: e.message });
    }
}


function* sagas() {
    yield takeLatest("REQUEST_POSTS", fetchPosts);
}

export default sagas;
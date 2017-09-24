import { takeEvery, delay, END } from 'redux-saga';
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects';
import Api from '../api'

function* fetchPosts(action) {
    try {
        const user = yield call(Api.fetch, action.payload);
        yield put({ type: "RECEIVE_POSTS", user: user });
    } catch (e) {
        yield put({ type: "REQUEST_FAILED", message: e.message });
    }
}


function* saga() {
    yield takeLatest("REQUEST_POSTS", fetchPosts);
}

export default saga;
import { takeEvery } from 'redux-saga'
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects'
import API from '../api/'

function* getConfig(action) {
    try {
        const posts = yield call(API.getConfig, action.payload);
        yield put({ type: "RECEIVE_POSTS", posts: posts });
    } catch (e) {
        yield put({ type: "REQUEST_FAILED", message: e.message });
    }
}


function* sagas() {
    yield takeEvery("GET_CONFIG", getConfig);
}

export default sagas;
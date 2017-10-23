import { takeEvery } from 'redux-saga'
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects'
import API from '../api/'
import * as types from '../actions/ActionTypes'

function* getConfig(action) {
    try {
        const data = yield call(API.getConfig, action.payload)
        
        yield put({ type: types.GET_CONFIG + '/SUCCESS', data: data.result })
    } catch (e) {
        yield put({ type: types.GET_CONFIG + '/FAIL', message: e.message })
    }
}


function* sagas() {
    yield takeEvery("GET_CONFIG", getConfig)
}

export default sagas
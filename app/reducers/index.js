import { combineReducers } from 'redux'
import { GET_CONFIG, INVALIDATE_CONFIG } from '../actions/ActionTypes'
import _ from 'lodash'
import Immu from 'immutable'
import { routerReducer } from 'react-router-redux'

window.Immu = Immu  // debug


// config
export const config = (state = {}, action) => {

    const entries = _.castArray(_.get(action, 'payload.entry')),
        entry = entries[0] || ''
    
    switch (action.type) {

        case GET_CONFIG:

            return Immu.fromJS(state).mergeDeep(_.set({}, entry.split('/'), {
                loading: true
            })).toJS()

        case `${GET_CONFIG}/SUCCESS'`:


            return Immu.fromJS(state).mergeDeep(_.set({}, entry.split('/'), {
                loading: false,
                data: action.data
            })).toJS()

        case `${GET_CONFIG}/FAIL'`:

            return Immu.fromJS(state).mergeDeep(_.set({}, entry.split('/'), {
                loading: false,
                data: []
            })).toJS()



        case INVALIDATE_CONFIG:
            return {
                ...state,
                loading: false,
                data: []
            }

        default:
            return state
    }
}
export default combineReducers({
    config,
    routerReducer
})
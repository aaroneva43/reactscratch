
import * as types from './ActionTypes'

export const getConfig = (cfg) => {

    if (!cfg['entry']) throw 'NO REST ENTRY SPECIFIED IN PAYLOAD'

    return {
        type: types.GET_CONFIG,
        payload: {
            entry: cfg['entry']
        }
    }
}


export const setConfg = (cfg) => {

    if (!cfg['entry']) throw 'NO REST ENTRY SPECIFIED IN PAYLOAD'

    return {
        type: types.SET_CONFIG,
        payload: cfg
    }
}

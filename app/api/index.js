import utils from '../utils'


const API_BASE = 'http://172.22.2.231:8181/rest/v1'

export default {

    getConfig: (cfg) => {
        cfg = {
            entry: cfg.entry || '',
            params: cfg.params || {}
        }

        return fetch(`${API_BASE}/${cfg.entry}?${utils.serializeParams(cfg.params)}`).then(response => response.json())
    }
}
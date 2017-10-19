import utils from '../utils'

export default {

    getConfig: (cfg) => {
        cfg = {
            entry: cfg.entry || '',
            params: cfg.params || {}
        }

        let url = `${APP_CONFIG.api_url}/${cfg.entry}?${utils.serializeParams(cfg.params)}`

        return fetch(url).then(response => response.json())
    }
}
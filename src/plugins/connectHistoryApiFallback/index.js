const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback')
const {CONFIG, ENV} = require('../../config')
const constants = require('../../constants')

function init(app){
    const pluginConfig = CONFIG.application.connectHistoryApiFallback;
    if(!pluginConfig){
        console.error('cannot found configuration for plugin framework::connectHistoryApiFallback')
        process.exit(constants.ERROR_CODE.PLUGIN_LOAD_ERROR);
    }
    pluginConfig.forEach(cfg => {
        console.log(`[framework::connectHistoryApiFallback] Mounted ${ENV("CONTEXT_PATH") + cfg.location} -> ${path.join(constants.PROJECT_ROOT_DIR, cfg.path)}`)
        app.use(
            ENV("CONTEXT_PATH") + cfg.location,
            history(),
            express.static(path.join(constants.PROJECT_ROOT_DIR, cfg.path))
        )
    })
}
module.exports = {
    init: init
}
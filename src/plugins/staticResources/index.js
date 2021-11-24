const express = require('express');
const path = require('path');

const {CONFIG, ENV} = require('../../config')
const constants = require('../../constants');

function init(app){
    const pluginConfig = CONFIG.application.staticResources;
    if(!pluginConfig){
        console.error('cannot found configuration for plugin framework::staticResources')
        process.exit(constants.ERROR_CODE.PLUGIN_LOAD_ERROR);
    }
    pluginConfig.forEach(cfg => {
        console.log(`[framework::staticResources] Mounted ${ENV("CONTEXT_PATH") + cfg.location} -> ${path.join(constants.PROJECT_ROOT_DIR, cfg.path)}`)
        app.use(
            ENV("CONTEXT_PATH") + cfg.location,
            express.static(path.join(constants.PROJECT_ROOT_DIR, cfg.path))
        )
    })
}
module.exports = {
    init: init
}
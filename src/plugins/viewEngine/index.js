const express = require('express');
const path = require('path');

const {CONFIG, ENV} = require('../../config')
const constants = require('../../constants');
const engines = require('./engines');

function init(app){
    const pluginConfig = CONFIG.application.viewEngine;
    if(!pluginConfig){
        console.error('cannot found configuration for plugin framework::viewEngine')
        process.exit(constants.ERROR_CODE.PLUGIN_LOAD_ERROR);
    }
    //console.log(`[framework::viewEngines] Mounted ${ENV["CONTEXT_PATH", ""] + cfg.location} -> ${path.join(constants.PROJECT_ROOT_DIR, cfg.path)}`)
    if(engines[pluginConfig.engine]){
        engines[pluginConfig.engine](app, pluginConfig)
        console.log(`[framework::viewEngines] View engine ${pluginConfig.engine} loaded successful.`)
    }else{
        console.error(`[framework::viewEngines] ERROR: View engine ${pluginConfig.engine} is not be supported, please check configuration file.`)
        process.exit(constants.ERROR_CODE.PLUGIN_LOAD_ERROR);
    }
}
module.exports = {
    init: init
}
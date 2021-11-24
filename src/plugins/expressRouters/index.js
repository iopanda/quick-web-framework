const express = require('express');
const path = require('path');
const fs = require('fs');
const requireDir = require('require-dir');

const {CONFIG, ENV} = require('../../config')
const constants = require('../../constants');

const fullName = "[framework::middleware::expressRouters]"
function init(app){
    const pluginConfig = CONFIG.application.expressRouters;
    if(!pluginConfig){
        console.error(`[${fullName}] cannot found configuration for plugin ${fullName}`)
        process.exit(constants.ERROR_CODE.PLUGIN_LOAD_ERROR);
    }
    pluginConfig.forEach(cfg => {
        if(cfg.type === 'autoscan'){
            var routers = requireDir(path.join(constants.PROJECT_ROOT_DIR, cfg.path), {
                duplicates: false,
                extensions: ['.js']
            })
            for(let name in routers){
                app.use(`${ENV("CONTEXT_PATH") + cfg.location}/${name}`, routers[name]);
                console.log(`[${fullName}] Mounted ${ENV("CONTEXT_PATH") + cfg.location}/${name} -> ${path.join(constants.PROJECT_ROOT_DIR, cfg.path, name)}`)
            }
        }else if(cfg.type === 'specific'){
            var router = require(path.join(constants.PROJECT_ROOT_DIR, cfg.path));
            app.use(`${ENV("CONTEXT_PATH") + cfg.location}`, router);
            console.log(`[${fullName}] Mounted ${ENV("CONTEXT_PATH") + cfg.location} -> ${path.join(constants.PROJECT_ROOT_DIR, cfg.path)}`)
        }else{
            console.error(`[${fullName}] ERROR: cannot process router type ${cfg.type}, please check your configuration file.`)
            process.exit(constants.ERROR_CODE.PLUGIN_LOAD_ERROR)
        }

    })
}
module.exports = {
    init: init
}
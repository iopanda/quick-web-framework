const constants = require('../constants');
const {CONFIG} = require('../config');

var orm = null;
if(CONFIG.application.plugins.indexOf('framework::database::ormFramework') != -1){
    var ormConfig = CONFIG.application.ormFramework;
    if(!ormConfig){
        console.error(`[database::ormFramework] ERROR: cannot find configuration for plugin database::ormFramework`)
        process.exit(constants.ERROR_CODE.PLUGIN_LOAD_ERROR);
    }

    if(ormConfig.type === 'sequelize'){
        orm = require('./sequelize')
    }else{
        console.error(`[database::ormFramework] ERROR: ${ormConfig.type} is not been supported`)
        process.exit(constants.ERROR_CODE.PLUGIN_LOAD_ERROR);
    }
}

module.exports = orm;
const {CONFIG, ENV} = require('../../../../config')

const config = CONFIG.application.session.persistence;
const PLUGIN_NAME = "MIDDLEWARE_SESSION_CLOUDANT"
const CONF_ENV_MAPPER = {
    url: `${PLUGIN_NAME}_URL`,
    instanceName: `${PLUGIN_NAME}_INSTANCE_NAME`,
    database: `${PLUGIN_NAME}_DATABASE`,
    prefix: `${PLUGIN_NAME}_PREFIX`,
    ttl: `${PLUGIN_NAME}_TTL`,
    disableTTLRefresh: `${PLUGIN_NAME}_DISABLE_TTL_REFRESH`,
    dbViewName: `${PLUGIN_NAME}_DB_VIEW_NAME`,
    dbDesignName: `${PLUGIN_NAME}_DB_DESIGN_NAME`,
    dbRemoveExpMax: `${PLUGIN_NAME}_DB_REMOVE_EXP_MAX`
}

function getProfile(){
    var result = {};
    for(let k in CONF_ENV_MAPPER){
        if(ENV(CONF_ENV_MAPPER[k])) {
            result[k] = ENV(CONF_ENV_MAPPER[k]);
        } else if (config[k]) {
            result[k] = config[k];
        }
    }
    return result;
}

function getConfigurationNames(){
    return Object.keys(CONF_ENV_MAPPER);
}

function getEnvironmentVariableNames(){
    var result = [];
    for(let k in CONF_ENV_MAPPER){
        result.push(CONF_ENV_MAPPER[k])
    }
    return result;
}

function getConfiguration(){
    return config;
}

module.exports = {
    getProfile: getProfile,
    getConfiguration: getConfiguration,
    getConfigurationNames: getConfigurationNames,
    getEnvironmentVariableNames: getEnvironmentVariableNames
}
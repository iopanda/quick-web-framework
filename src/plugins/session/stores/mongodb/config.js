const {CONFIG, ENV} = require('../../../../config')

const config = CONFIG.application.session.persistence;
const PLUGIN_NAME = "MIDDLEWARE_SESSION_MONGODB"
const CONF_ENV_MAPPER = {
    mongoUrl: `${PLUGIN_NAME}_URL`,
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
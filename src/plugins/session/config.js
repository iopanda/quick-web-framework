const {CONFIG, ENV} = require('../../config')

const config = CONFIG.application.session;
const PLUGIN_NAME = "MIDDLEWARE_SESSION"
const CONF_ENV_MAPPER = {
    cookie: {
        name: `${PLUGIN_NAME}_NAME`,
        proxy: `${PLUGIN_NAME}_PROXY`,
        resave: `${PLUGIN_NAME}_RESAVE`,
        rolling: `${PLUGIN_NAME}_ROLLING`,
        saveUninitialized: `${PLUGIN_NAME}_SAVE_UNINITIALIZED`,
        secret: `${PLUGIN_NAME}_SECRET`,
        cookie: `${PLUGIN_NAME}_COOKIE`,
        persistence: `${PLUGIN_NAME}_PERSISTENCE`,
    }
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
    if(result.persistence){
        result.store = require(`./stores/${result.persistence.store}`)
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
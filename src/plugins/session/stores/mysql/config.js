const {CONFIG, ENV} = require('../../../../config')

const config = CONFIG.application.session.persistence;
const PLUGIN_NAME = "MIDDLEWARE_SESSION_MYSQL"
const CONF_ENV_MAPPER = {
    host: `${PLUGIN_NAME}_HOST`,
    port: `${PLUGIN_NAME}_PORT`,
    user: `${PLUGIN_NAME}_USER`,
    password: `${PLUGIN_NAME}_PASSWORD`,
    database: `${PLUGIN_NAME}_DATABASE`,
    chearExpired: `${PLUGIN_NAME}_CHEAR_EXPIRED`,
    checkExpirationInterval: `${PLUGIN_NAME}_CHECK_EXPIRATION_INTERVAL`,
    expiration: `${PLUGIN_NAME}_EXPIRATION`,
    cheateDatabaseTable: `${PLUGIN_NAME}_CHEATE_DATABASE_TABLE`,
    connectionLimit: `${PLUGIN_NAME}_CONNECTION_LIMIT`,
    endConnectionOnClose: `${PLUGIN_NAME}_END_CONNECTION_ON_CLOSE`,
    charset: `${PLUGIN_NAME}_CHARSET`,
    schame: `${PLUGIN_NAME}_SCHEMA`,
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
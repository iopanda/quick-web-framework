// const config = require('../../config')
const constants = require('../../constants')
const {CONFIG, ENV} = require('../../config')

const config = CONFIG.application.sequelize;
const ENV_PREFIX = 'MODULE_SEQUELIZE'
const CONF_ENV_MAPPER = {
    url: `${ENV_PREFIX}_DB_URL`,
    dialect: `${ENV_PREFIX}_DB_DIALECT`,
    host: `${ENV_PREFIX}_DB_HOST`,
    port: `${ENV_PREFIX}_DB_PORT`,
    username: `${ENV_PREFIX}_DB_USERNAME`,
    password: `${ENV_PREFIX}_DB_PASSWORD`,
    dbname: `${ENV_PREFIX}_DB_NAME`,
    schema: `${ENV_PREFIX}_DB_SCHEMA`,
    catalog: `${ENV_PREFIX}_DB_CATALOG`,
    pool: `${ENV_PREFIX}_DB_POOL_JSON`,
    dialectOptions: `${ENV_PREFIX}_DB_DIALECT_OPTIONS_JSON`,
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
    return conf;
}

module.exports = {
    name: 'sequelize',
    fullName: 'framework::module::sequelize',
    modelConfig: config.models,
    getProfile: getProfile,
    getConfiguration: getConfiguration,
    getConfigurationNames: getConfigurationNames,
    getEnvironmentVariableNames: getEnvironmentVariableNames
}



const {CONFIG, ENV} = require('../../../config')

const conf = CONFIG.application.authenticator;
const PLUGIN_NAME = "MIDDLEWARE_AUTH_APPID"
const CONF_ENV_MAPPER = {
    name: `${PLUGIN_NAME}_NAME`,
    clientId: `${PLUGIN_NAME}_CLIENT_ID`,
    tenantId: `${PLUGIN_NAME}_TENANT_ID`,
    secret: `${PLUGIN_NAME}_SECRET`,
    oAuthServerUrl: `${PLUGIN_NAME}_OAUTH_SERVER_URL`,
    profilesUrl: `${PLUGIN_NAME}_PROFILE_URL`,
    discoveryEndpoint: `${PLUGIN_NAME}_DISCOVERY_ENDPOINT`,
    type: `${PLUGIN_NAME}_TYPE`,
    scopes: `${PLUGIN_NAME}_SCOPES`,
    redirectUri: `${PLUGIN_NAME}_REDIRECT_URI`,
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
    getProfile: getProfile,
    getConfiguration: getConfiguration,
    getConfigurationNames: getConfigurationNames,
    getEnvironmentVariableNames: getEnvironmentVariableNames
}
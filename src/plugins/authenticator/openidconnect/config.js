const {CONFIG, ENV} = require('../../../config')

const conf = CONFIG.application.authenticator;
const PLUGIN_NAME = "MIDDLEWARE_AUTH_OPENID"
const CONF_ENV_MAPPER = {
    authorizationURL: `${PLUGIN_NAME}_AUTHORIZATION_URL`,
    tokenURL: `${PLUGIN_NAME}_TOKEN_URL`,
    clientID: `${PLUGIN_NAME}_CLIENT_ID`,
    scope: `${PLUGIN_NAME}_SCOPE`,
    response_type: `${PLUGIN_NAME}_RESPONSE_TYPE`,
    clientSecret: `${PLUGIN_NAME}_CLIENT_SECRET`,
    skipUserProfile: `${PLUGIN_NAME}_SKIP_USER_PROFILE`,
    issuer: `${PLUGIN_NAME}_ISSUER`,
    addCACert: `${PLUGIN_NAME}_ADD_CA_CERT`,
    callbackUrl: `${PLUGIN_NAME}_CALLBACK_URL`,
    CACertPathList: `${PLUGIN_NAME}_CA_CERT_PATH_LIST`
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
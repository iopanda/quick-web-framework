const {CONFIG, ENV} = require('../../../config')

const config = CONFIG.application.authenticator;
const PLUGIN_NAME = "MIDDLEWARE_AUTH_OPENID"
const CONF_ENV_MAPPER = {
    issuer: `${PLUGIN_NAME}_ISSUER`,
    authorization_endpoint: `${PLUGIN_NAME}_AUTHORIZATION_ENDPOINT`,
    token_endpoint: `${PLUGIN_NAME}_TOKEN_ENDPOINT`,
    jwks_uri: `${PLUGIN_NAME}_JWKS_URI`,
    userinfo_endpoint: `${PLUGIN_NAME}_USERINFO_ENDPOINT`,
    introspection_endpoint: `${PLUGIN_NAME}_INTROSPECTION_ENDPOINT`,
    client_id: `${PLUGIN_NAME}_CLIENT_ID`,
    client_secret: `${PLUGIN_NAME}_CLIENT_SECRET`,
    redirect_uris: `${PLUGIN_NAME}_REDIRECT_URIS`,
    response_types: `${PLUGIN_NAME}_RESPONSE_TYPES`
}

function getProfile(){
    var result = {};
    for(let k in CONF_ENV_MAPPER){
        if(ENV(CONF_ENV_MAPPER[k])) {
            if(['redirect_uris', 'response_types'].indexOf(k) > -1){
                result[k] = JSON.parse(ENV(CONF_ENV_MAPPER[k]));
            }else{
                result[k] = ENV(CONF_ENV_MAPPER[k]);
            }
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
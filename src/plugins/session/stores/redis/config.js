const {CONFIG, ENV} = require('../../../../config')

const config = CONFIG.application.session.persistence;
const PLUGIN_NAME = "MIDDLEWARE_SESSION"
const CONF_ENV_MAPPER = {
    host: `${PLUGIN_NAME}_HOST`,
    port: `${PLUGIN_NAME}_PORT`,
    path: `${PLUGIN_NAME}_PATH`,
    url: `${PLUGIN_NAME}_URL`,
    string_numbers: `${PLUGIN_NAME}_STRING_NUMBERS`,
    return_buffers: `${PLUGIN_NAME}_RETURN_BUFFERS`,
    detect_buffers: `${PLUGIN_NAME}_DETECT_BUFFERS`,
    socket_keepalive: `${PLUGIN_NAME}_SOCKET_KEEPALIVE`,
    socket_initial_delay: `${PLUGIN_NAME}_SOCKET_INITIAL_DELAY`,
    no_ready_check: `${PLUGIN_NAME}_NO_READY_CHECK`,
    enable_offline_queue: `${PLUGIN_NAME}_ENABLE_OFFLINE_QUEUE`,
    retry_unfulfilled_commands: `${PLUGIN_NAME}_RETRY_UNFULFILLED_COMMANDS`,
    password: `${PLUGIN_NAME}_PASSWORD`,
    user: `${PLUGIN_NAME}_USER`,
    db: `${PLUGIN_NAME}_DB`,
    family: `${PLUGIN_NAME}_FAMILY`,
    disable_resubscribing: `${PLUGIN_NAME}_DISABLE_RESUBSCRIBING`,
    rename_commands: `${PLUGIN_NAME}_RENAME_COMMANDS`,
    tls: `${PLUGIN_NAME}_TLS`,
    prefix: `${PLUGIN_NAME}_PREFIX`,
    retry_strategy: `${PLUGIN_NAME}_RETRY_STRATEGY`,
    connect_timeout: `${PLUGIN_NAME}_CONNECT_TIMEOUT`,
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
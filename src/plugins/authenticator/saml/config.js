/**
 * this module is build for passport
 * please refer https://www.passportjs.org/packages/passport-saml/
 */

const {CONFIG, ENV} = require('../../../config')

const conf = CONFIG.application.authenticator;
const PLUGIN_NAME = "MIDDLEWARE_AUTH_SAML"
const CONF_ENV_MAPPER = {
    callbackUrl: `${PLUGIN_NAME}_CALLBACK_URL`,
    path: `${PLUGIN_NAME}_PATH`,
    protocol: `${PLUGIN_NAME}_PROTOCOL`,
    host: `${PLUGIN_NAME}_HOST`,
    entryPoint: `${PLUGIN_NAME}_ENTRY_POINT`,
    issuer: `${PLUGIN_NAME}_ISSUER`,
    audience: `${PLUGIN_NAME}_AUDIENCE`,
    cert: `${PLUGIN_NAME}_CERT`,
    privateKey: `${PLUGIN_NAME}_PRIVATE_KEY`,
    decryptionPvk: `${PLUGIN_NAME}_DECRYPTION_PVK`,
    signatureAlgorithm: `${PLUGIN_NAME}_SIGNATURE_ALGORITHM`,
    digestAlgorithm: `${PLUGIN_NAME}_DIGEST_ALGORITHM`,
    xmlSignatureTransforms: `${PLUGIN_NAME}_XML_SIGNATURE_TRANSFORMS`,
    additionalParams: `${PLUGIN_NAME}_ADDITIONAL_PARAMS`,
    additionalAuthorizeParams: `${PLUGIN_NAME}_ADDITIONAL_AUTHORIZE_PARAMS`,
    identifierFormat: `${PLUGIN_NAME}_IDENTIFIER_FORMAT`,
    acceptedClockSkewMs: `${PLUGIN_NAME}_ACCEPTED_CLOCK_SKEW_MS`,
    attributeConsumingServiceIndex: `${PLUGIN_NAME}_ATTRIBUTE_CONSUMING_SERVICE_INDEX`,
    disableRequestedAuthnContext: `${PLUGIN_NAME}_DISABLE_REQUESTED_AUTHN_CONTEXT`,
    authnContext: `${PLUGIN_NAME}_AUTHN_CONTEXT`,
    racComparison: `${PLUGIN_NAME}_RAC_COMPARISON`,
    forceAuthn: `${PLUGIN_NAME}_FORCE_AUTHN`,
    providerName: `${PLUGIN_NAME}_PROVIDER_NAME`,
    skipRequestCompression: `${PLUGIN_NAME}_SKIP_REQUEST_COMPRESSION`,
    authnRequestBinding: `${PLUGIN_NAME}_AUTHN_REQUEST_BINDING`,
    disableRequestAcsUrl: `${PLUGIN_NAME}_DISABLE_REQUEST_ACS_URL`,
    scoping: `${PLUGIN_NAME}_SCOPING`,
    disableRequestAcsUrl: `${PLUGIN_NAME}_DISABLE_REQUEST_ACS_URL`

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
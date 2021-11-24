const { cwd } = require('process');

module.exports = {
    PROJECT_ROOT_DIR: cwd(),
    FRAMEWORK_ROOT_DIR: __dirname,
    ERROR_CODE: {
        APPLICATION_CONFIG_NOT_FOUND: 1,
        ENVIRONMENT_VARIABLE_NOT_FOUND: 2,
        PLUGIN_LOAD_ERROR: 3
    }
}
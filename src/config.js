const constants = require('./constants');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

try{
    var fp = fs.readFileSync(path.join(constants.PROJECT_ROOT_DIR, 'application.yaml'));;
    var config = yaml.load(fp, 'utf8')
}catch(err){
    console.log('application.yaml cannot be parse correctly, please check your application.yaml to continue.')
    process.exit(constants.ERROR_CODE.APPLICATION_CONFIG_NOT_FOUND);
}

function ENV(name, default_value){
    if(process.env[name] != null){
        return process.env[name];
    }else {
        return default_value
    }
}

function CONFIG(){
    return config;
}

module.exports = {
    ENV: ENV,
    CONFIG: CONFIG()
}
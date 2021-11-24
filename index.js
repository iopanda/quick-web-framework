require('dotenv').config()
const application = require('./src/application')
const orm_framework = require('./src/orm_framework')
const config = require('./src/config')

const server = new application.ExpressApplication()

var plugins = []
var sdk = {}
var models = {}
var renders = {}

// export before init framework to avoid cycle dependence issue
module.exports = {
  server: server,
  ORMFramework: orm_framework,
  models: models,
  renders: renders,
  plugins: plugins,
  sdk: sdk,
  config: config.CONFIG,
  envs: config.ENV
}

function initExtendedPlugins(pluginName){

}

const pluginList = config.CONFIG.application.plugins
pluginList.forEach(fullName => {
  let dn = fullName.split("::")
  let scope = dn[0];
  let type = dn[1];
  let name = dn[2];
  // if(type=='middleware') return
  try{
    let plugin = null;
    if(scope == 'framework'){
      plugin = require(`./src/plugins/${name}`)
    }else if(scope == 'extended'){
      plugin = require(`${name}`)
    }
    plugin.init(server.app, {
      plugins: plugin,
      sdk: sdk,
      models: models
    })
  }catch(err){
    console.error(`Plugin [${fullName}] is not found. Please install by 'npm install ${name}'`)
    console.error(err)
    process.exit(1)
  }
})


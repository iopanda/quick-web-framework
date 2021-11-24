
const { modelConfig, CONFIG, ENV} = require('./config')
const constants = require('../../constants')
const path = require('path')
const requireDir = require('require-dir')
const instance = require('./instance')

const sequelize = instance.instance

function scanModel(){
    if(!modelConfig) return;
    var result = {};
    modelConfig.forEach(plugin => {
        var modelPath = plugin.path
        var modelType = plugin.type
        var tableName = plugin.tableName
        var modelName = plugin.modelName
        if(modelType == 'autoscan'){
            var models = requireDir(path.join(constants.PROJECT_ROOT_DIR, modelPath), {
                duplicates: false,
                extensions: ['.js']
            })
            for(let name in models){
                result[name] = sequelize.define(name, models[name])
            }
        }else if(modelType == 'specific'){
            if(!tableName) tableName = modelName
            var structure = require(path.join(constants.PROJECT_ROOT_DIR, modelPath))
            result[modelName] = sequelize.define(tableName, structure)
        }
    })
    sequelize.sync()
    return result
}

module.exports = {
    scan: scanModel,
}
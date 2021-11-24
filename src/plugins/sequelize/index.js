const scanner = require('./scanner')
const instance = require('./instance')
const config = require('./config')
const {CONFIG, ENV} = require('../../config')

const models = scanner.scan()
function init(app, options){
    if(options.models){
        for(let n in models){
            options.models[n] = models[n]
        }
    }
    if(options.sdk){
        options.sdk['sequelize'] = {
            instance: instance.instance,
            transaction: instance.transaction
        }
    }
}

module.exports = {
    init: init,
    models: models
}
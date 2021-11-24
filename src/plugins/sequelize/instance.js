const { Sequelize, DataTypes, Model, Op } = require('sequelize')
const {ENV, CONFIG} = require('../../config')
const constants = require('../../constants')
const config = require('./config')

var sequelize = null;
// create connection
const PROFILE = config.getProfile()

if(PROFILE.url){
    sequelize = new Sequelize(PROFILE.url)
}else{
    sequelize = new Sequelize({
        host: PROFILE.host,
        port: PROFILE.port,
        username: PROFILE.username,
        password: PROFILE.password,
        database: PROFILE.dbname,
        dialect: PROFILE.dialect,
        pool: PROFILE.pool,
        dialectOptions: PROFILE.dialectOptions
    })
}

module.exports = {
    __framework: require('sequelize'),
    transaction: sequelize.transaction,
    instance: sequelize,
    models: sequelize.models,
    Model: Model,
    DataTypes: DataTypes,
    Op: Op
}
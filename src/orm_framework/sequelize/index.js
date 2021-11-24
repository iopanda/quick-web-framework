const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const {ENV, CONFIG} = require('../../config');
const constants = require('../../constants');

var sequelize = null;
// create connection
if(false && ENV("ORM_DB_URL") && ENV("ORM_DB_DIALECT")){
    sequelize = new Sequelize(ENV("ORM_DB_URL"), {
        dialect: ENV("ORM_DB_DIALECT"),
        dialectOptions: CONFIG.application.ormFramework.options || {}
    })
}else{
    const requiredEnvs = [
        'ORM_DB_DIALECT',
        'ORM_DB_HOST',
        'ORM_DB_PORT',
        'ORM_DB_USERNAME',
        'ORM_DB_PASSWORD',
        'ORM_DB_DBNAME'
    ]
    for(let i in requiredEnvs){
        var ename = requiredEnvs[i];
        if(!ENV(ename, null)){
            console.error(`[database::ormFramework] ERROR: Environment variable ${ename} is missing, cannot create database connection.`)
            process.exit(constants.ERROR_CODE.PLUGIN_LOAD_ERROR)
        }
    }
    sequelize = new Sequelize(
        ENV("ORM_DB_DBNAME"),
        ENV("ORM_DB_USERNAME"),
        ENV("ORM_DB_PASSWORD"),
        {
            host: ENV("ORM_DB_HOST"),
            port: ENV("ORM_DB_PORT"),
            dialect: ENV("ORM_DB_DIALECT"),
            dialectOptions: CONFIG.application.ormFramework.options || {},
            pool: CONFIG.application.ormFramework.pool
        }
    )
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
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const constants = require('../constants');
const {CONFIG, ENV} = require('../config');

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

module.exports = class ApplicationServer {

    constructor() {
        this.PORT = normalizePort(ENV("PORT", 3000));
        this.debug = require('debug')(CONFIG.application.name);
        this.app = express();
        this.app.use(express.json({limit: process.env['HTTP_BODY_LIMIT'] || '1mb'}));
        this.app.use(express.urlencoded({limit: process.env['HTTP_BODY_LIMIT'] || '1mb', extended: true}));
        this.init();
    }

    init() {
        this.app.set('port', this.PORT)
        this.app.use(logger('dev'));
        // this.platformPluginInit();
        // this.expandedPlutinInit();
    }

    platformPluginInit(){
        const app = this.app;
        if(!CONFIG.application.plugins || CONFIG.application.plugins.length === 0){
            console.warn('no plugin found')
        }
        var plugins = CONFIG.application.plugins.filter(p => {
            return p.split('::')[0] == 'framework' && p.split('::')[1] == 'middleware'
        }).map(p => {
            return p.split('::')[2];
        })
        for(let i in plugins){
            try{
                var plugin = require(`../plugins/${plugins[i]}`);
            }catch(err){
                console.error(`platform plugin ${plugins[i]} is not found, please check plugin name and try again.`);
                console.error(err)
                process.exit();
            }
            try{
                plugin.init(app);
                console.log(`plugin ${plugins[i]} has configured`)
            }catch(err){
                console.error(`platform plugin ${plugins[i]} cannot be load successful, please check your configuration and try again.`);
                console.error(err)
                process.exit();
            }
        }
    }

    expandedPlutinInit(){
        const app = this.app;
        if(!CONFIG.application.plugins || CONFIG.application.plugins.length === 0){
            console.warn('no plugin found')
        }
        var plugins = CONFIG.application.plugins.filter(p => {
            return p.split('::')[0] == 'expended' && p.split('::')[1] == 'middleware'
        }).map(p => {
            return p.split('::')[2];
        })
        for(let i in plugins){
            try{
                var plugin = require(`${plugins[i]}`);
            }catch(err){
                console.error(`expended plugin ${plugins[i]} is not found, please check plugin name and try again.`);
                console.error(err)
                process.exit();
            }
            try{
                plugin.init(app);
            }catch(err){
                console.error(`platform plugin ${plugins[i]} cannot be load successful, please check your configuration and try again.`);
                console.error(err)
                process.exit();
            }
        }
    }

    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    start() {
        var http = null;
        var server = null;
        if(process.env['PROTOCOL'] && process.env['PROTOCOL'].toLowerCase() == 'https'){
            http = require('https');
            server = http.createServer({
                key: fs.readFileSync('./cert/key.pem'),
                cert: fs.readFileSync('./cert/cert.pem')
            }, this.app)
        }else{
            http = require('http')
            server = http.createServer(this.app)
        }
        var debug = this.debug;
        server.listen(this.PORT);
        server.on('error', this.onError);
        server.on('listening', function(){
            var addr = server.address();
            var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            debug('Listening on ' + bind);
        });
    }
}
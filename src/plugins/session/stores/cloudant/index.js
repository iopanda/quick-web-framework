const session = require('express-session');
const Store = require('connect-cloudant-store')(session);
const config = require('./config')

const PROFILE = config.getProfile()

const store = new Store(PROFILE)

store.on('connect', function(){
    console.log('Cloudant connected')
})
store.on('disconnect', function(){
    console.log('Cloudant disconnected')
})
store.on('error', function(err){
    console.error('Cloudant error: ')
    console.error(err)
})
module.exports = store
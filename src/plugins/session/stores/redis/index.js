const session = require('express-session')
const redis = require('redis')
const Store = require('connect-redis')(session)
const config = require('./config')

const PROFILE = config.getProfile()
const client = redis.createClient(PROFILE.persistence)

module.exports = new Store({
    client: client
})
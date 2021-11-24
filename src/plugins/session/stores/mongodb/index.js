const Store = require('connect-mongo')
const config = require('./config')

const PROFILE = config.getProfile()
module.exports = Store.create(PROFILE)
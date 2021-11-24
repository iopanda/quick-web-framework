var session = require('express-session');
const Store = require('express-mysql-session')(session)
const config = require('./config')

const PROFILE = config.getProfile()
module.exports = new MySQLStore(PROFILE);
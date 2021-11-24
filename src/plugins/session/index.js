const session = require('express-session')
const config = require('./config')

const PROFILE = config.getProfile()

function init(app){
    app.use(session(PROFILE))
}

module.exports = {
    init: init
}
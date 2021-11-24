const passport = require('passport');
const {Issuer, Strategy} = require('openid-client')
const session = require('express-session');
const constants = require('../../../constants');
const config = require('./config');

const PROFILE = config.getProfile();

const issuer = new Issuer(PROFILE)
const client = new issuer.Client(PROFILE);
const strategy = new Strategy({
    client: client
}, function(tokenset, userinfo, done){
    done(null, userinfo)
})

module.exports = {
    Strategy: strategy,
}
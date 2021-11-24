const passport = require('passport');
const OpenIDConnectStrategy = require('passport-idaas-openidconnect').IDaaSOIDCStrategy;
const session = require('express-session');
const constants = require('../../../constants');
const config = require('./config');

const PROFILE = config.getProfile();
const Strategy = new OpenIDConnectStrategy(PROFILE, function (iss, sub, profile, accessToken, refreshToken, params, done) {
    process.nextTick(function () {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;
        done(null, profile)
    })
})

module.exports = {
    Strategy: Strategy,
}
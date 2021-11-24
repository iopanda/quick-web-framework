const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const constants = require('../../../constants');
const config = require('./config');

const PROFILE = config.getProfile();
const STRATEGY = new SamlStrategy(PROFILE, function(profile, done){
    return done(null, profile)
})

module.exports = {
    Strategy: SamlStrategy,
}
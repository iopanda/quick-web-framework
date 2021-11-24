const express = require('express');
const path = require('path');
const fs = require('fs');
const requireDir = require('require-dir');
const passport = require('passport')
const session = require('express-session')
const url = require('url')

const { CONFIG, ENV } = require('../../config')
const constants = require('../../constants');

function ensureAuthenticated(req, res, next) {
    console.log(req.isAuthenticated())
    if (!req.isAuthenticated()) {
        req.session.originalUrl = req.originalUrl;
        res.redirect(`${ENV("CONTEXT_PATH")}/login`);
    } else {
        return next();
    }
}

function init(app) {
    const pluginConfig = CONFIG.application.authenticator;
    if (!pluginConfig) {
        console.error('cannot found configuration for plugin framework::staticResources')
        process.exit(constants.ERROR_CODE.PLUGIN_LOAD_ERROR);
    }

    if (ENV("NODE_ENV") == 'dev') {
        if(pluginConfig.preprocessing && pluginConfig.preprocessing.dummyUser){
            app.use(function(req, res, next){
                req.user = pluginConfig.preprocessing.dummyUser
                next()
            })
        }else{
            console.warn('No dummy user provided, application cannot get user login data by authenticator.')
        }
    } else {
        var provider = require(`./${pluginConfig.strategy}`);
        var Strategy = provider.Strategy;
        passport.use(Strategy);
        console.log(Strategy.name)

        // enable session
        if (pluginConfig['enableSession'] == true) {
            app.use(session({ secret: 'default'}))
        }
        app.use(passport.initialize())
        if(pluginConfig['enableSession'] == true){
            app.use(passport.session())
        }

        if(pluginConfig.preprocessing && pluginConfig.preprocessing.serializer){
            var serializer = require(`${constants.PROJECT_ROOT_DIR}/${pluginConfig.preprocessing.serializer}`)
            passport.serializeUser(serializer)
        }else{
            passport.serializeUser(function (user, done) {
                done(null, user)
            })
        }
        if(pluginConfig.preprocessing && pluginConfig.preprocessing.deserializer){
            var deserializer = require(`${constants.PROJECT_ROOT_DIR}/${pluginConfig.preprocessing.deserializer}`)
            passport.deserializeUser(deserializer)
        }else{
            passport.deserializeUser(function (obj, done) {
                done(null, obj)
            });
        }

        app.get(`${ENV("CONTEXT_PATH")}/failure`, function (req, res) {
            res.send('auth failure')
        })

        app.get(`${ENV("CONTEXT_PATH")}/auth/sso/callback`, function (req, res, next) {
            var redirect_url = req.session.originalUrl;
            console.log(redirect_url)
            passport.authenticate(Strategy.name, {
                successRedirect: redirect_url,
                failureRedirect: `${ENV("CONTEXT_PATH")}/failure`,
            })(req, res, next);
        });
        app.get(`${ENV("CONTEXT_PATH")}/login`, passport.authenticate(Strategy.name)); 

        pluginConfig['protectedUrls'].forEach(url => {
            app.use(`${ENV("CONTEXT_PATH")}${url}`, ensureAuthenticated)
            console.log(`${ENV("CONTEXT_PATH")}${url} is been protected`)
        })
    }
}

module.exports = {
    init: init
}
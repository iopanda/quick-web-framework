const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
const config = require('./config');

const PROFILE = config.getProfile();
const Strategy = new WebAppStrategy(PROFILE)

module.exports = {
    Strategy: Strategy,
}
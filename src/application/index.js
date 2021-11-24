const ExpressApplication = require('./ExpressApplication');
const KoaApplication = require('./KoaApplication');

function generateExpressApplication(config){
    return new ExpressApplication();
}

function generateKoaApplication(config){
    return new KoaApplication();
}

module.exports = {
    ExpressApplication: generateExpressApplication,
    KoaApplication: generateKoaApplication
}
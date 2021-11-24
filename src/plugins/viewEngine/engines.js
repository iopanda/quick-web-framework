const path = require('path');
const constants = require('../../constants');

function jade(app, options){
    app.set('views', path.join(constants.PROJECT_ROOT_DIR, options.path));
    app.set('view engine', 'jade');
}

function ejs(app, options){
    app.set('views', path.join(constants.PROJECT_ROOT_DIR, options.path));
    app.set('view engine', 'ejs');
}

function react(app, options){
    app.set('views', path.join(constants.PROJECT_ROOT_DIR, options.path));
    app.set('view engine', 'jsx');
    app.engine('jsx', require('express-react-views').createEngine());
}

module.exports = {
    jade: jade,
    ejs: ejs,
    react: react
}
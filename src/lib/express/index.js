const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const customMiddleware = require('./customMiddleware/ignoreFavicon.middleware');

const config = require('../../config');

module.exports.index = (app) => {

  return new Promise((resolve, reject) => {

    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(methodOverride());
    app.use(compression());
    app.use(helmet());
    app.use(cors({ origin: true, credentials: true }));

    // Morgan
    if (config.log)
      app.use(morgan('dev'));

    resolve();

  })

};
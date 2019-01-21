const HandlerGenerator = require('../controllers/generateToken.controller');

let handlers = new HandlerGenerator();

module.exports = (app) => {
    app.post('/api/login', handlers.login);
}
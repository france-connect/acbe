const controller = require('../controller/index');
const middleware = require('../../../lib/express/customMiddleware/checkToken.middleware');

module.exports = (app) => {
    app.get('/api/agentConnect/logout', middleware.checkToken, controller.setLogout);
}
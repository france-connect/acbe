const controller = require('../controller/index');
const middleware = require('../../../lib/express/customMiddleware/checkToken.middleware');

module.exports = (app) => {
    app.post('/api/agentConnect/logout', middleware.checkToken, controller.setLogout);
}
const controller = require('../controller/index');
const middleware = require('../../../lib/express/customMiddleware/checkToken.middleware');

module.exports = (app) => {
    app.get('/api/agentConnect/callToken/:code', middleware.checkToken, controller.getTokenAndUserInfos, (req, res) => {
        if (res.information.status === 200) {
            res.send(res.information.data);

        } else {
            res.send(res.information);
        }
    });
}
const controller = require('../controller/index');
const middleware = require('../../../lib/express/customMiddleware/checkToken.middleware');

module.exports = (app) => {
    app.get('/api/agentConnect/callToken/:code', middleware.checkToken, controller.getTokenAndUserInfos, (req, res) => {
        if (req.response.status !== 'failed') {
            res.status(200).json(req.response);
        } else {
            res.status(400).json(req.response);
        }
    });
}
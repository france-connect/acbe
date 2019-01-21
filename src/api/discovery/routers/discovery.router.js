const configuration = require('../../../config');

module.exports = (app) => {
    app.get('/api/discovery', (req, res) => res.json(configuration));
}
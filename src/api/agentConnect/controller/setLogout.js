const jwt = require('jwt-simple');
const config = require('../../../config');

const setLogout = (req, res) => {
    if (req.body.state) {

        const idTokenHint = jwt.encode({ aud: config.CLIENT_ID }, config.CLIENT_SECRET);
        const uri = `${config.FC_URL}${config.LOGOUT_FC_PATH}?id_token_hint=${idTokenHint}&state=${req.body.state}`;

        res.json({
            status: 'success',
            uri: uri
        });

    } else {
        res.json({
            status: 'fail',
            message: 'No body filled'
        });
    }
};

module.exports = {
    setLogout
}
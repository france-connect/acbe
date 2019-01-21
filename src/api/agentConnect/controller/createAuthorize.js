const config = require('../../../config');

const createAuthorize = (req, res) => {
    if (req.body.state && req.body.nonce) {

        const uri = `${config.FC_URL}${config.AUTHORIZATION_FC_PATH}?response_type=${config.RESPONSE_TYPE}&client_id=${config.CLIENT_ID}&acr_values=${config.ACR_VALUES}&redirect_uri=${config.FS_URL}${config.CALLBACK_FS_PATH}&scope=openid ${config.SCOPES}&state=${req.body.state}&nonce=${req.body.nonce}`;

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
    createAuthorize
};


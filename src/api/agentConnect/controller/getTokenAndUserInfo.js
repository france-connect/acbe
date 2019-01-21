const config = require('../../../config');

const getTokenAndUserInfos = (req, res, next) => {
    console.log('req', req.params);
    let response = {
        status: 'success',
        userInfos: {}
    };

    // check if the mandatory Authorization code is there.
    if (!req.params.code) {
        response = {
            status: 'failed',
            message: `req.params.code is missing or undefined, value : ${req.params}`
        }

        req.response = response;
        next();
    }

    // Set request params.
    const body = {
        grant_type: 'authorization_code',
        redirect_uri: `${config.FS_URL}${config.CALLBACK_FS_PATH}`,
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        code: req.params.code,
    };

    try {
        // Request access token.
        const { data: { access_token: accessToken, id_token: idToken } } = await axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: querystring.stringify(body),
            url: `${config.FC_URL}${config.TOKEN_FC_PATH}`,
        });

        // Make a call to the France Connect API endpoint to get user data.
        if (!accessToken) {
            response = {
                status: 'failed',
                message: `No AccessToken`
            }
    
            req.response = response;
            next();
        }

        response.accessToken = accessToken;
        response.session.accessToken = accessToken;
        response.session.idToken = idToken;

        const { data: userInfo } = await axios({
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
            url: `${config.FC_URL}${config.USERINFO_FC_PATH}`,
        });

        // Helper to set userInfo value available to the profile page.
        req.response.userInfos = userInfo;

    } catch (error) {
        response = {
            status: 'failed',
            message: `${error}`
        }

        req.response = response;
        next();
    }

    next();
};

module.exports = {
    getTokenAndUserInfos
};


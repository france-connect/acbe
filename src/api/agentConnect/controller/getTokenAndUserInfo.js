const axios = require('axios');
const config = require('../../../config');

const getTokenAndUserInfos = (req, res, next) => {
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


    requestTokenWithCode(config, req.params.code)
        .then((tokenRes) => {
            return requestUserInfo(config, tokenRes.data.access_token, axios);
        })
        .then((infosRes) => {
            console.log('user infos : ', infosRes.data);
            res.render('userInfo', getRenderObj(infosRes));
        })
        .catch((err) => {
            res.send(err.message);
        });

};


/**
* request on token url with customAxios to prevent self signed error
* @param  {Object} params
* @param  {String} code   [code retrieved with authorize]
* @param  {Object} axios
* @return {Promise}
*/

const requestTokenWithCode = (params, code, axios) => {
    if (!code) {
        return Promise.reject(new Error(`Error fetching your code
        verify your openIdParameters : ${params}`));
    }

    return axios.post(`${params.FC_URL}${params.TOKEN_FC_PATH}`, {
        redirect_uri: `${params.FS_URL}${params.CALLBACK_FS_PATH}`,
        client_id: params.CLIENT_ID,
        client_secret: params.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
    })
        .catch((err) => {
            return Promise.reject(new Error(getErrorFromAxiosRes(err)));
        });
};

/**
 * get userInfo with axios to prevent self signed error
 * @param  {Object} params
 * @param  {String} access_token
 * @param  {Object} axios
 * @return {Promise}
 */

const requestUserInfo = (params, accessToken, axios) => {
    if (!accessToken) {
        return Promise.reject(new Error(`Error fetching token.
        Verify your openIdParameters.tokenUrl : ${params.FC_URL}${params.TOKEN_FC_PATH}`));
    }

    return axios.get(`${params.FC_URL}${params.USERINFO_FC_PATH}?schema=openid`,
        { headers: { Authorization: `Bearer ${accessToken}` } })
        .catch((err) => {
            Promise.reject(new Error(getErrorFromAxiosRes(err)));
        });
};

const getErrorFromAxiosRes = (res) => {
    if (res.response.data.error) {
        return `Error fetching user infos : ${res.response.data.error}, check your clientID and clientSecret`;
    } else if (res.code && res.response && res.response.data.message) {
        return `Error fetching user infos : err Code : ${res.code}, err message : ${res.response.data.message}`;
    } else if (res.code) {
        return `Error fetching user infos : err Code : ${res.code}`;
    } else if (res.response && res.response.data.message) {
        return `Error fetching user infos : err message : ${res.response.data.message}`;
    }
    return '';
};

module.exports = {
    getTokenAndUserInfos
};


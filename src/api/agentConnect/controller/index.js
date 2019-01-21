const getAuthorize  = require('./createAuthorize');
const getTokenAndUserInfos = require('./getTokenAndUserInfo'); 

module.exports = {
    createAuthorize: getAuthorize.createAuthorize,
    getTokenAndUserInfos: getTokenAndUserInfos.getTokenAndUserInfos
};

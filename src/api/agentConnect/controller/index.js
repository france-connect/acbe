const getAuthorize  = require('./createAuthorize');
const getTokenAndUserInfos = require('./getTokenAndUserInfo');
const logout = require('./setLogout'); 

module.exports = {
    createAuthorize: getAuthorize.createAuthorize,
    getTokenAndUserInfos: getTokenAndUserInfos.getTokenAndUserInfos,
    setLogout: logout.setLogout
};

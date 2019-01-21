const  fs = require('fs');
const  config = require('../../config');

module.exports.default = (app) => {
  // Controllers Api AgentConnect
  fs.readdirSync(`${config.base}/api/agentConnect/routers`).forEach(route => {
    require(`${config.base}/api/agentConnect/routers/${route}`)(app);
  });

  // Controllers Api auth
  fs.readdirSync(`${config.base}/api/auth/routers`).forEach(route => {
    require(`${config.base}/api/auth/routers/${route}`)(app);
  });

   // Controllers Api dicovery
   fs.readdirSync(`${config.base}/api/discovery/routers`).forEach(route => {
    require(`${config.base}/api/discovery/routers/${route}`)(app);
  });
}

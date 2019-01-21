const  express = require('express');
const chalk = require('chalk');
const config = require('./config');
const app = express();

(async function run() {

  // Express
  await require('./lib/express').index(app);

  // Router
  await require('./api/services/router.services').default(app);

  // Server 
  app.listen(config.server.port, config.server.ip, () => {
    // Info
    console.log(chalk.greenBright(`-------\nServer-> 
          mode: [${chalk.magentaBright(`${config.mode}`)}]
          url: ${chalk.blueBright(`http://${config.server.ip}:${config.server.port}`)}\n-------`));
    // Ready!
    console.log(chalk.black.bgGreenBright(`>>Agent Connect Back-End ready!<<`));
  });

})();
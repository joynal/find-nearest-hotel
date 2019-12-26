const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

module.exports = app;

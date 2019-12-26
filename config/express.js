const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const routes = require('../routes');
const { logs, env } = require('./vars');
const error = require('./error');

const app = express();

if (env !== 'production') {
  const swaggerDefinition = {
    info: {
      title: 'Find nearest hotel',
      version: '1.0.0',
      description: 'Find nearest hotel API',
      contact: {
        email: 'hi@joynal.dev',
      },
    },
  };

  const options = {
    explorer: true,
  };

  // Options for the swagger docs
  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition,
    apis: ['./routes.js'],
  }, options);

  // serve swagger documentation
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api v1 routes
app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use(error.notFound);

module.exports = app;

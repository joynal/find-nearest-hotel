require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  apiKey: process.env.HERE_API_KEY,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};

const expressConfigs = require('./expressConfigs'),
      expressMiddlewares = require('./expressMiddlewares'),
      graphqlConfig = require('./graphqlConfig');
      require('dotenv').config();

module.exports = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  graphqlConfig,
  expressConfigs,
  expressMiddlewares
}
